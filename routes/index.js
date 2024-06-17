const express = require('express');
const pdfService = require('../service/pdf-service');

const router = express.Router()
router.get('/docs',(req,res,next) =>{
    console.log

    const stream = res.writeHead(200,{
        'Conten-Type':'application/pdf',
        'Content-Disposition' : 'attachment;filename=docs.pdf'
    });

    pdfService.buildPDF(
        (chunk) => stream.write(chunk),
        () => stream.end()
    );
})

module.exports = router;