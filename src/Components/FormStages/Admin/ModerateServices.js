import React from "react";
import { MainHeading } from "../../../globalStyles";
import { Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Label } from "govuk-react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useState } from "react";
import { Category } from "@mui/icons-material";

export const ModerateServices = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const [category, setCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([
        {name: 'Grants Application', category: 'Finance', company: 'PwC', submittedBy: 'mathew.steele@pwc.com', status: 'pending'},
        {name: 'GP Appointments', category: 'Health',company: 'PwC', submittedBy: 'mathew.steele@pwc.com', status: 'pending'},
        {name: 'Council Services', category: 'Utility', company: 'PwC', submittedBy: 'mathew.steele@pwc.com', status: 'pending'},
        {name: 'MOT Appointments', category: 'Utility', company: 'PwC', submittedBy: 'mathew.steele@pwc.com', status: 'pending'},
        {name: 'Restaurant Reservations', category: 'Hospitality', company: 'PwC', submittedBy: 'mathew.steele@pwc.com', status: 'pending'},
        {name: 'Investment Oppurtunities', category: 'Finance', company: 'PwC', submittedBy: 'mathew.steele@pwc.com', status: 'pending'},
    ]);

    const pendingItems = data.filter(item => item.status === 'pending');

    const rowStyle = {
        backgroundColor: '#f2f2f2',
    };

    const handleApprove = (id) => {
        const index = data.findIndex(item => item.id === id);
        if (index !== -1 && data[index].status === "pending"){
            data[index].status = "approved";
            setData({ data });
        }
    }

    const alternateRowStyle = {
        backgroundColor: '#fff',
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }
  return (
    <div style={{ width: "100%", backgroundColor: '#528AAE', minHeight: "100vh", justifyContent: 'flex-start'}}>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60px", marginBottom: '0'}}>
        <button onClick={() => handleTabClick("tab1")} style={{marginRight: "10px", backgroundColor: activeTab === "tab1" ? "#fff" : "#ddd", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer"}}>Pending Requests</button>
        <button onClick={() => handleTabClick("tab2")} style={{marginRight: "10px", backgroundColor: activeTab === "tab2" ? "#fff" : "#ddd", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer"}}>Approved</button>
        <button onClick={() => handleTabClick("tab3")} style={{backgroundColor: activeTab === "tab3" ? "#fff" : "#ddd", border: "none", padding: "10px 20px", borderRadius: "4px", cursor: "pointer"}}>Declined</button>
    </div>
    <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', marginTop: '10px'}}>
    <div style={{ width: '80%', backgroundColor: 'white', padding: "20px"}}>
    {activeTab === "tab1" && (
        <div>
            <h3>Pending Service Requests</h3>
            <div style={{ paddingLeft: '10px', paddingRight: '10px', backgroundColor: '#528AAE'}}>
            <h4 style={{color: 'white', paddingBottom: '10px'}}>6 Pending Approvals</h4>
            </div>
            <div>
            <div style={{backgroundColor: '#D8D8D8'}}>
            <label>
                Filter By Category:
                <select value={category} onChange={handleCategoryChange}>
                    <option value={"All"}>All</option>
                    <option value={"Category A"}>Category A</option>
                    <option value={"Category B"}>Category B</option>
                    <option value={"Category C"}>Category C</option>
                </select>
            </label>
            <label style={{marginLeft: '5px'}}>
                Search:
                <input type="text" value={searchTerm} onChange={handleSearchChange} />
            </label>
            </div>
            <table style={{ border: '1px solid black', width: '100%', borderCollapse: 'collapse'}}>
                <thead>
                <tr>
                    <th>Service Name</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Submitted by</th>
                    <th>Options</th>
                </tr>
                </thead>
               <tbody>
                {pendingItems.map((item, index) => (
                    <tr key={index} style={index%2 === 0 ? rowStyle : alternateRowStyle}>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.company}</td>
                        <td>{item.submittedBy}</td>
                        <td><button onClick={() => handleApprove(item.id)} style={{backgroundColor: 'green', color: 'white', borderRadius: '4px'}}>Approve</button><button style={{backgroundColor: 'red', marginLeft: '10px', color: 'white', borderRadius: '4px'}}>Deny</button></td>
                    </tr>
                ))}
                <tr>

                </tr>
               </tbody>
            
            </table>
            </div>
        </div>
    )}
    {activeTab === "tab2" && (
        <div>Content for tab 2</div>
    )}
    {activeTab === "tab3" && (
        <div>Content for tab 3</div>
    )}
    </div>
    </div>
    </div>
  );
};
