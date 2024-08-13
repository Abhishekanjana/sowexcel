import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const Home = () => {
  const [data, setData] = useState([]);
  const [isDataReady, setIsDataReady] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
      setIsDataReady(true); // Data is ready to be saved
    };
    reader.readAsBinaryString(file);
  };

  const handleSave = () => {
    // This function will be used to save the data to the database
    // Assuming you're sending data to a REST API or directly interacting with your database
    if (isDataReady) {
      console.log("Data to save:", data);
      // Here you would typically send the data to your backend
      // For example:
      // axios.post('/api/save-data', { data })
      //   .then(response => console.log("Data saved successfully", response))
      //   .catch(error => console.error("Error saving data", error));
    } else {
      console.log("No data to save");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Upload Excel File</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{
          display: 'block',
          margin: '20px auto',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      {data.length > 0 && (
        <>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '20px',
              textAlign: 'left',
            }}
          >
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    style={{
                      padding: '10px',
                      borderBottom: '2px solid #ddd',
                      backgroundColor: '#f4f4f4',
                    }}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td
                      key={i}
                      style={{
                        padding: '10px',
                        borderBottom: '1px solid #ddd',
                      }}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleSave}
            style={{
              display: 'block',
              margin: '20px auto',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '4px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Save Data to Database
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
