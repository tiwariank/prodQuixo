import React from 'react';
import {Modal} from 'reactstrap';

class ResultBoard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            

        }
    }

    render(){
        return(
            <Modal
            isOpen={this.props.isOpen}
            >

            </Modal>
        )
    }
}

export default ResultBoard;