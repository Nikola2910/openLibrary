import React, { Component } from "react";

export class Search extends Component {
  state = {
    value: "",
  };

  handleChange = (e) => {
    let searchValue = e.target.value;
    this.setState({
      value: searchValue,
    });
  };

  handleSubmit = (e) => {
    const { onSearch } = this.props;
    const { value } = this.state;
    e.preventDefault();
    onSearch(value);
    console.log("search submited " + value);
  };

  render() {
    const { value } = this.state;

    return (
      <div className="row ">
        <div className="col xl2 offset-xl5 l4 offset-l4 m6 offset-m3 s10 offset-s1">
          <form className="center" onSubmit={this.handleSubmit}>
            <div className="input-field ">
              <input
                onChange={this.handleChange}
                id="last_name"
                type="text"
                value={value}
              />
              <label htmlFor="last_name">What do you want to read?</label>
            </div>

            <button
              className="btn waves-effect waves-light "
              type="submit"
              name="action"
            >
              search
              <i className="material-icons right">search</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
