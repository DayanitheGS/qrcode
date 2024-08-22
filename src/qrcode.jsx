import { useState } from "react";
// import React from 'react'
const qrcode = () => {
 const[img,setImg]=useState ("")
 const[loading,setLoading]=useState(false)
 const[data,setData]=useState("https://daya.co/")
 const[qrsize ,setQrsize]=useState("100")
  async function generatorqr(){
     setLoading(true)
    try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(data)}`
     setImg(url)
    }catch(error){ 
    console.error("Error Generating QR code",error)
    }finally{
      setLoading(false)
    }
  }
  function downloadqr(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob) => { 
      const link =document.createElement("a")
      link.href=URL.createObjectURL(blob)
      link.download="qrcode.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
   } );
  }
  return (
    <>
    <div className="qr">
    <h1 className="title">Qr Code Generator</h1>
   {loading && <p>loading Please Wait....</p>}
   {img&&<img className="img" src={img}/>}
    <div className="input">
      <label htmlFor="data"className="inputone">
      Enter Data Input
      <input type="text"value={data} id="data"placeholder="Enter Your QR Name"onChange={(e)=>setData(e.target.value)}/>
    </label>
    <label htmlFor="size"className="inputone">
    Enter Size(100 ex)
      <input type="text"value={qrsize} id="size" placeholder="Enter Requried Size"onChange={(e)=>setQrsize(e.target.value)}/>
    </label>
    </div >
    <div className="button"> <button className="generator" onClick={generatorqr } disabled={loading}>GeneratorQrcode</button>
    <button className="download" onClick={downloadqr}>Download QrCode</button>
    </div>
    </div>
    </>
  )
}
export default qrcode 