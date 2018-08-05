import React,{Component} from 'react';
import Header from '../Components/Layout/Header';
import TableRow from '../Components/Layout/TableRow';

import ExcelUpload from '../Components/Form/ExcelUpload';

import { Container, Row } from 'reactstrap';


export default class Class extends Component {
    constructor(props){
    	super(props);
    	this.state = {
            rows: []
        };
        this.setRows = this.setRows.bind(this);
        this.clearData = this.clearData.bind(this);
    }

    componentWillMount() {
        if (localStorage.getItem('tableRows')) {
            this.setState({ rows: JSON.parse(localStorage.getItem('tableRows')) });
        }

    }

    clearData() {
        localStorage.clear();
        this.setState({ rows: [] });
    }

    setRows(rows) {
        localStorage.setItem('tableRows', JSON.stringify(rows));
        this.setState({ rows });
    }

    render() {
        const { rows } = this.state;
        return (
          <div>
              <div className="App">
                  <Header />
              </div>
              <Container className="mg-tp-5-percent">
                  <Row>
                      <ExcelUpload
                          setRows={this.setRows}
                      />
                  </Row>
              </Container>
              <Container>
                  <Row>
                      <TableRow
                          rows={rows}
                          clearData={this.clearData}
                      />
                  </Row>
              </Container>
          </div>
        );
    }
}
