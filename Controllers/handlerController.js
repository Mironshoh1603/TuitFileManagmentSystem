const FeatureAPI = require('../utility/featureApi');
const AppError = require('../utility/appError');
const catchErrorAsync = require('../utility/catchErrorAsync');

const responseFunction = (res, statusCode, data) => {
  if (Array.isArray(data)) {
    res.status(statusCode).json({
      status: 'Success',
      results: data.length,
      data: data,
    });
  } else {
    res.status(statusCode).json({
      status: 'Success',
      data: data,
    });
  }
};

const deleteOne = (Model) => {
  return catchErrorAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) {
      return next(new AppError('Document was not found with that ID', 404));
    }

    responseFunction(res, 204, data);
  });
};

const updateOne = (Model) => {
  return catchErrorAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      validator: true,
    });
    console.log(data);
    if (!data) {
      return next(new AppError('Not found this ID', 404));
    }

    responseFunction(res, 202, data);
  });
};

const addOne = (Model) => {
  return catchErrorAsync(async (req, res) => {
    const data = await Model.create(req.body);
    responseFunction(res, 201, data);
  });
};

const getOne = (Model, options, options2) => {
  return async (req, res, next) => {
    try {
      let data;
      console.log(options, 'option');
      if (options2) {
        data = await Model.findById(req.params.id)
          .populate(options)
          .populate(options2);
      } else if (options) {
        data = await Model.findById(req.params.id).populate(options);
        console.log('data:', data);
      } else {
        data = await Model.findById(req.params.id);
      }
      responseFunction(res, 200, data);
    } catch (err) {
      console.log(err);
    }
  };
};

const getAll = (Model, options, options2) => {
  return catchErrorAsync(async (req, res, next) => {
    let datas;
    const filter = new FeatureAPI(req.query, Model)
      .filter()
      .sorting()
      .field()
      .pagination();

    if (options2) {
      datas = await filter.databaseQuery.populate(options).populate(options2);
    } else if (options) {
      datas = await filter.databaseQuery.populate(options);
    } else {
      datas = await filter.databaseQuery;
    }
    responseFunction(res, 200, datas);
  });
};

module.exports = { deleteOne, updateOne, addOne, getOne, getAll };
