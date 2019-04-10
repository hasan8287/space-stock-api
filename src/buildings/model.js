const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const Buildings = new Schema({
  // email for username
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['office', 'apartment'],
    default: 'office',
  },
  description: {
    type: String,
    required: true,
  },
  facilities: [{
    type: String,
  }],
  images: [{
    type: String,
  }],
  address: {
    streets: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
});

Buildings.statics = {

  getById (id) {
    return this.findOne({ _id: mongoose.Types.ObjectId(id) });
  },

  /**
   * updateData
   * * update data driver
   * @param {data: object, limit: objectId}
   */

   updateData (data, id) {
    return this.findOneAndUpdate({ _id: id }, {
      $set: data,
    }, { new: true });
   },

  /**
   * getData
   * * get data driver
   * @param {page: int, limit: int}
   */
  getData (page = 1, limit = 10, name, type) {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    const filter = {};

    if (name) {
      filter.name = {
        $regex: `.*${name}.*`,
      };
    }

    if (type) {
      filter.type = type;
    }

    return this.paginate(filter, { page, limit });
  },


  /**
   * createData
   * * for create data driver
   * @param {object}
   */
  createData (param) {
    const data = new this(param);
    return data.save();
  },

  deleteData (id) {
    return this.deleteOne({ _id: mongoose.Types.ObjectId(id) });
  },
}


Buildings.plugin(mongoosePaginate);

module.exports = mongoose.model("buildings", Buildings);
