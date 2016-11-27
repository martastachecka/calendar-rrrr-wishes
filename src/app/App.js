import React from 'react';

import { Grid, Row, Col } from 'react-bootstrap'

import Menu from './menu/Menu'

const App = ({ 
    children 
}) => (
    <Grid>
        <Row>
            <Col>
                <Menu />
            </Col>
        </Row>
        <Row>
            <Col>
                {children}
            </Col>
        </Row>
    </Grid>
)

export default App
