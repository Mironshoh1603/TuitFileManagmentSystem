class FeatureAPI {
  constructor(clientQuery, databaseQuery) {
    this.clientQuery = clientQuery;
    this.databaseQuery = databaseQuery;
  }
  // Filter
  filter() {
    let queryC = JSON.stringify(this.clientQuery);
    queryC = queryC.replace(/\bgt|gte|lte|lt\b/g, (val) => `$${val}`);
    let queryData = JSON.parse(queryC);
    this.databaseQuery = this.databaseQuery.find(queryData);
    return this;
  }
  // Sorting
  sorting() {
    if (this.clientQuery.sort) {
      const sortQuery = this.clientQuery.sort.split(',').join(' ');
      this.databaseQuery = this.databaseQuery.sort(sortQuery);
    } else {
      this.databaseQuery = this.databaseQuery.sort('createdAt');
    }
    return this;
  }
  // Selecting Fields
  field() {
    if (this.clientQuery.field) {
      const fieldQuery = this.clientQuery.field.split(',').join(' ');
      this.databaseQuery = this.databaseQuery.select(fieldQuery);
    } else {
      this.databaseQuery = this.databaseQuery.select('-__v');
    }
    return this;
  }
  //Pagination
  pagination() {
    const page = this.clientQuery.page * 1 || 1;
    const limit = this.clientQuery.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.databaseQuery = this.databaseQuery.skip(skip).limit(limit);
    return this;
  }
}

module.exports = FeatureAPI;
