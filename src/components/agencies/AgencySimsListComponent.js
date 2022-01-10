import PropTypes from "prop-types";
import React, {useState} from 'react';

import {formatNumber} from "../../functions/generalFunctions";
import FormModalComponent from "../modals/FormModalComponent";
import AgencyAddSimContainer from "../../containers/agencies/AgencyAddSimContainer";

// Component
function AgencySimsListComponent({agency}) {
    // Local states
    const [addSimModal, setAddSimEditModal] = useState({show: false, header: 'AJOUTER UN COMPTE A ' + agency.name});

    // Hide add sim modal form
    const handleAddSimModalHide = () => {
        setAddSimEditModal({...addSimModal, show: false})
    }

    // Render
    return (
        <>
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                            <tr>
                                <th>NOM</th>
                                <th>NUMERO</th>
                                <th>SOLDE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agency.sims.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.number}</td>
                                        <td className='text-right text-success text-bold'>
                                            {formatNumber(item.balance)}
                                        </td>
                                    </tr>
                                )
                            })}
                            {agency.sims.length === 0 && (
                                <tr>
                                    <td colSpan={3}>
                                        <div className='alert custom-active text-center'>
                                            Pas de comptes
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <FormModalComponent modal={addSimModal} handleClose={handleAddSimModalHide}>
                <AgencyAddSimContainer handleClose={handleAddSimModalHide} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
AgencySimsListComponent.propTypes = {
    agency: PropTypes.object.isRequired
};

export default React.memo(AgencySimsListComponent);
