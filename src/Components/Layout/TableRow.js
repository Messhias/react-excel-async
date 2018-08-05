import React,{ Component } from 'react';
import { Table } from 'reactstrap';
import { Button, FormGroup } from 'reactstrap';
import { Container, Col } from 'reactstrap';
import { Offline, Online } from "react-detect-offline";

export default class TableRow extends Component {
    constructor(props){
    	super(props);
    	this.state = {
          text: 'Sync my data'
      };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            this.setState({ text: 'Sync my data' });
        }
    }

    mountTableHeaders(rows) {
        if (rows.length > 0) {
          return rows[0].map((row, i) => <th key={i}>{row}</th>);
        }
    }

    mountTableBody(rows) {
        let body = [];
        for (var i = 1; i < rows.length; i++) {
            body.push(
                <tr key={rows.length + i}>
                  {this.innerTableContent(rows[i])}
                </tr>
            );
        }

        return body;
    }

    innerTableContent(rows) {
        return rows.map((row, i) => <td key={rows.length + i}>{row}</td>)
    }

    syncData() {
        this.setState({ text: 'Data sync successfull!! '});
    }

    renderButtons() {
        const { text } = this.state;

        return (
          <FormGroup
            key='render-buttons-form-group'
          >
              <Col>
                <Button
                  color="primary"
                  onClick={this.props.clearData}
                  >
                  Clear data
                </Button>
                <Online>
                   <Button
                      color="success"
                      onClick={this.syncData.bind(this)}
                    >
                     {text}
                   </Button>
                </Online>
              </Col>
              <Col>
                <Offline>
                   You must be online to sync your data! Active your internet connection.
                </Offline>
              </Col>
          </FormGroup>
        );
    }

    render() {
        const { rows } = this.props;
        if (rows.length > 0) {
            return(
                <Container>
                  {this.renderButtons()}
                  <Table
                    hover
                    responsive
                    >
                    <thead>
                      <tr>
                        {this.mountTableHeaders(rows)}
                      </tr>
                    </thead>
                    <tbody>
                      {this.mountTableBody(rows)}
                    </tbody>
                  </Table>
                </Container>
            );
        }

        return null;
  }
}
