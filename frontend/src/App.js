import { useState } from 'react';
import axios from 'axios';

const GetSignedUrl = 'http://localhost:9000/upload';

function App() {
  const [formData, setFormData] = useState({});

  const submit = async () => {
    const options = { headers: { 'Content-Type': 'application/json' } };
    const res = await axios.post(GetSignedUrl, {}, options)
                  .then(async (response) => {
                    const options = { headers: { 'Content-Type': 'multipart/form-data'} };
                    await axios.put(response.data.url, formData, options)
                  .then(() => { return true; }).catch(() => { return false; });
                    }).catch(() => { return false; });

    // const res = await axios.put(signedURL, formData, options)
    //                     .then(() => { return true; }).catch(() => { return false; });
  }

  return (
    <>
      <input type="file" onChange={(e) => {console.log(e.target.files[0]); setFormData(e.target.files[0])}} accept="image/*" />
      <button onClick={submit}> Upload</button>
    </>
  );
}

export default App;
