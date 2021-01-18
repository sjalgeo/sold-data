// @ts-nocheck
import React from 'react';
import './App.css';

function App() {
  const [items, setItems] = React.useState([])
  const [postcode, setPostcode] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [page, setPage] = React.useState(0)
  
  React.useEffect(() => {
    const doFetch = async () => {
      const path = `https://landregistry.data.gov.uk/data/ppi/transaction-record.json?_page=${page}&propertyAddress.postcode=${encodeURI(search.toUpperCase())}&_sort=-transactionDate`;
                 // https://landregistry.data.gov.uk/data/ppi/transaction-record.json?_page=0&propertyAddress.postcode=BD13%202SL
      const response = await fetch(path);
      const data = await response.json();
      setItems(data.result.items);
    }

    search !== '' && doFetch();
  }, [search, page]);

  console.warn(`Searching for ${search}, Page ${page}, length: ${items.length}`)

  return (
    <div className="App">
      <header className="App-header">
        Fake Mouse Price
      </header>
      <div>
         <input value={postcode} onChange={(e) => setPostcode(e.target.value)} onKeyPress={(e)=> {
           if (e.code === 'Enter' ) {
            setPage(0)
            setSearch(postcode)
           }
         }} />
         <div>{search !== '' && items.length === 0 && <span>No more results</span>}</div>
        <table>
          <tbody>
            {items.map((property,index) => (
              <tr key={index}>
                <td>{property.propertyAddress.saon} {property.propertyAddress.paon}</td>
                <td>{property.propertyAddress.street}, {property.propertyAddress.town}</td>
                <td>£{property.pricePaid}</td>
                <td>{property.transactionDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => setPage(page-1)} disabled={page === 0}>Prev</button>
        <button onClick={() => setPage(page+1)} disabled={items.length === 0}>Next</button>
      </div>
    </div>
  );
}

export default App;
