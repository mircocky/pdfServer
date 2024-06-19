const express = require('express');
const pdfService = require('../service/pdf-service');

const router = express.Router()
router.get('/docs',(req,res,next) =>{
    const data = req.query.data;
    console.log(typeof(data))
    console.log(data)
    console.log(data[0])
    const parsedData = JSON.parse(data)
    console.log(parsedData)
    console.log(parsedData['SHIPPER'])
    console.log(parsedData['containers'])
    // const parsedData = JSON.parse(data)
    // console.log(parsedData[0])

    const stream = res.writeHead(200,{
        'Conten-Type':'application/pdf',
        'Content-Disposition' : 'attachment;filename=docs.pdf'
    });

    pdfService.buildPDF(
        (chunk) => stream.write(chunk),
        () => stream.end(),
        parsedData
    );
})

module.exports = router;