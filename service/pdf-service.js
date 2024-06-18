const PDFDocument = require('pdfkit');

DPFDocument = require('pdfkit');

function buildPDF(dataCallback, endCallback, data) {

    const doc = new PDFDocument()
    doc.on('data', dataCallback);
    doc.on('end', endCallback);
    doc
     .fontSize(25)
     .text(data);
    doc.end();

}
module.exports = { buildPDF }; 