export const create = async ({ model, data, options } = {}) => {
  return await model.create(data);
};
export const find = async ({ model, filter = {}, option = {} }) => {
  return await model.findOne(filter).select(option?.select);
};

export const findById = async ({ model, Id, options = {} } = {}) => {
  return await model.findById(Id, options?.select);
};

export const findByIdAndUpdate = async ({ model, id, update, options }) => {
  return await model.findByIdAndUpdate(id, update, options);
};

export const findOneAndDelete = async ({ model, filter, options } = {}) => {
  return await model.findOneAndDelete(filter, options);
};

export const findAndUpdate = async ({ model, filter, update, options }) => {
  return await model.findOneAndUpdate(filter, update, options);
};

export const createIndex = async ({ model, Date }) => {
  return await model.index({ createdAt: 1 }, { expireAfterSeconds: Date });
};

export const findAll = async ({ model, filter, option }) => {
  return await model
    .find(filter)
    .select(option?.select)
    .skip(option?.skip)
    .limit(option?.limit);
};

export const deleteMany = async ({ model, filter, option }) => {
  return await model.deleteMany(filter);
};

export const deleteOne = async ({ model, filter, option }) => {
  return await model.deleteOne(filter, option);
};
