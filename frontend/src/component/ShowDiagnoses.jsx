import React, { Component } from 'react';
import im from '../assest/136920.jpg';
import Logo from './Logo';
import {
    Box,
    Grommet,
    Table,
    TableBody,
    TableCell,
    TableRow
} from 'grommet';
import { useParams } from 'react-router-dom'; // Import useParams hook
import '../App.css';

const theme = {
    global: {
        colors: {
            brand: '#000000',
            focus: '#000000'
        },
        font: {
            family: 'Lato',
        },
    },
};

// Removed the id variable

export function ShowDiagnoses() { // Changed to a functional component
    const { id } = useParams(); // Access id from URL params using useParams hook
    const [diagnoses, setDiagnoses] = React.useState([]); // Use state hook

    React.useEffect(() => { // Fetch data on component mount
        fetch(`http://localhost:3001/showDiagnoses?id=${id}`)
            .then(res => res.json())
            .then(res => setDiagnoses(res.data));
    }, [id]); // Dependency array to re-fetch data when id changes

    // Moved Header and Body components inside the ShowDiagnoses component

    const Header = () => (
        <Box
            tag='header'
            background='brand'
            pad='small'
            elevation='small'
            justify='between'
            direction='row'
            align='center'
            flex={false}
        >
            <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Logo></Logo></a>
        </Box>
    );

    const Body = () => (
        <div className="container">
            <div className="panel panel-default p50 uth-panel">
                {diagnoses.map(diagnosis =>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell scope="row">
                                    <strong>Appointment Id</strong>
                                </TableCell>
                                <TableCell>{diagnosis.appt}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <br />
                            <TableRow>
                                <TableCell scope="row">
                                    <strong>Doctor</strong>
                                </TableCell>
                                <TableCell>{diagnosis.doctor}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <br />
                            <TableRow>
                                <TableCell scope="row">
                                    <strong>Diagnosis</strong>
                                </TableCell>
                                <TableCell>{diagnosis.dignosis}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            <br />
                            <TableRow>
                                <TableCell scope="row">
                                    <strong>Prescription</strong>
                                </TableCell>
                                <TableCell>{diagnosis.prescription}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                )}
            </div>
            <hr />
        </div>
    );

    return (
        <div className ='main'>
            <img src={im} alt="imagekljshllihshfb"></img>
            <div className="content">
                <Grommet full={true} theme={theme}>
                    <Box fill={true}>
                        <Header />
                        <Body />
                    </Box>
                </Grommet>
            </div>
        </div>
    );
}

export default ShowDiagnoses;
