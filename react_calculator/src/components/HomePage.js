import React, {Component} from 'react';
import * as API from '../api/API';

class HomePage extends Component {
    static defaultProps = {
        "categories": ['Add', 'Subtract', 'Multiply', 'Divide']
    };
    constructor(props) {
        super(props);
        this.state = {
            arg_1: '',
            arg_2: '',
            result: '',
            operation: this.props.categories[0],
            title: this.props.categories[0],
            message: ''
        };
    }

    handleSelect = (e) => {
        this.setState(
            {
              title: e.target.value,
              operation: e.target.value
        });
    }

    handleChange = (varname, e) => {
          var change = {};
          change[varname] = e.target.value;
          this.setState(change);
    }

    handleSubmit = (data) => {
        if (isNaN(data.arg_1) || isNaN(data.arg_2)) {
          alert("Only numbers are allowed");
          return;
        }
        if (data.arg_1 === '' || data.arg_2 === '') {
          alert("Empty fields not allwed");
          return;
        }

        var status;
        API.calculate(data)
            .then((res) => {
                status = res.status;
                try {
                  return res.json();
                } catch(err) {
                  console.log(err);
                }
            }).then((json) => {
                if (status === 200) {
                    this.setState({
                      result: json.result,
                      message: json.message
                    });
                }
                else if (status === 201) {
                    this.setState({
                      result: json.result,
                      message: json.message
                    });
                }
                else if (status === 401) {
                    this.setState({
                        message: "Something went wrong ... Try again !!!"
                    });
                } else {
                    this.setState({
                        message: "Something went wrong !!!"
                    });
                }
            });
    };

    render() {
        let i = 0;
        let categoryOptions = this.props.categories.map((category) => {
            i += 1;
            let key = "category_" + i;
            return <option key={key} value={category}>{category}</option>
        });
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        <form>
                            <div className="form-group">
                                <h3>*** Calculator ***</h3>
                                <br/>
                                <h4> Performing Operation: {this.state.title}</h4>
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Arg 1:"
                                    placeholder="Enter argument 1"
                                    value={this.state.arg_1}
                                    onChange={this.handleChange.bind(this, 'arg_1')}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="Arg 2:"
                                    placeholder="Enter argument 2"
                                    value={this.state.arg_2}
                                    onChange={this.handleChange.bind(this, 'arg_2')}
                                />
                            </div>

                            <div className="form-group">
                                <select
                                    className="form-control"
                                    ref={"category"}
                                    value={this.state.operation}
                                    onChange={this.handleSelect.bind(this)}>
                                        {categoryOptions}
                                </select>
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    onClick={() => this.handleSubmit(this.state)}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <div className="col-md-3">
                        {this.state.message && (
                            <div className="alert alert-warning" role="alert">
                                {this.state.message}
                                {this.state.result}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
