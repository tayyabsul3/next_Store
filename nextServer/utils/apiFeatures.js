class apiFeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          title: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};
    console.log("keyword", keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }
  sort() {
    if (this.querystr.price === "low") {
      this.query = this.query.sort({ price: 1 });
      console.log("sort", this.query.price);
      // Ascending order
    } else if (this.querystr.price === "high") {
      this.query = this.query.sort({ price: -1 }); // Descending order
    } else {
      this.query = this.query.sort({ price: 1 }); // Default to low to high if no 'price' param
    }

    return this;
  }

  filter() {
    let querycopy = { ...this.querystr };
    //removing some firelds except category
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete querycopy[key]);

    // Filter and rating
    console.log("querycopy", querycopy);

    let querystr = JSON.stringify(querycopy);
    console.log("querystr", querystr);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    console.log(JSON.parse(querystr));

    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  pagination(resultperpage) {
    const currentpage = Number(this.querystr.page) || 1;

    const skip = resultperpage * (currentpage - 1);

    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
  }
}

module.exports = apiFeatures;
