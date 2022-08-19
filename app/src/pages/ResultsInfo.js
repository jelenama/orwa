import React from 'react'


const ResultsInfo = ({ rezultati}) => {
    return (
        <div className="App">
            <table>
            <tbody>
                <tr>
                    <th>IME TIMA</th>
                    <th>SCORE</th>
                </tr>
                {rezultati.map((val, key) => {
                    if(val.cat_pom_score){
                        return (
                        
                            <tr key={key}>
                                <td>{val.ime_tima}</td>
                                <td>{val.cat_pom_score}</td>
                            </tr>
                           
                        )

                    }else{
                        return (
                        
                            <tr key={key}>
                                <td>{val.ime_tima}</td>
                                <td>{val.cat_hh_score}</td>
                            </tr>
                           
                        )

                    }
                    
                })}
                </tbody>
            </table>
        </div>
    );
}

export default ResultsInfo;