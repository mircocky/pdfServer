const pdf = require('html-pdf');
const fs = require('fs');

// Function to convert an image to a Base64 string
function encodeImageToBase64(url) {
    return fs.readFileSync(url, 'base64');
}

function buildPDF(dataCallback, endCallback, data) {
    const imageUrl = "PNL_Heading.PNG"; // Replace with your image path
    const base64Image = encodeImageToBase64(imageUrl);

    function getCurrentDateTime() {
        // Create a new Date object for the current date/time
        const now = new Date();
    
        // Get components of the current date/time
        const day = now.getDate(); // Get the day of the month (1-31)
        const year = now.getFullYear().toString().slice(2); // Get the last two digits of the year (YY)
        const hours = now.getHours(); // Get the hours (0-23)
        const minutes = now.getMinutes(); // Get the minutes (0-59)
    
        // Create an array of month names (adjust as needed)
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    
        // Format the date into "dd-Jun-yy 15:44" format
        const formattedDate = `${padZero(day)}-${monthNames[now.getMonth()]}-${year} ${padZero(hours)}:${padZero(minutes)}`;
    
        return formattedDate;
    }
    
    // Function to pad single digit numbers with a leading zero
    function padZero(number) {
        return (number < 10 ? '0' : '') + number;
    }
    
    // Example usage:
    const currentDateTime = getCurrentDateTime();

    const containerRows = data.containers.map(container => `
        <tr>
            <td class="container_content">${container.containerNo}</td>
            <td class="container_content">${container.seal}</td>
            <td class="container_content">${container.type}</td>
            <td class="container_content">${container.kg} KG</td>
            <td class="container_content">${container.m3} M3</td>
            <td class="container_content">${container.packs}</td>
        </tr>
    `).join('');

    const htmlContent = `
    <html>
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>DELIVERY ORDER</title>
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }
                @page {
                    size: A4; /* Set page size */
                    margin: 50px; /* Adjust margins as necessary */
                }
                .header img {
                    width: 100%; /* Ensure image fills the width */
                }
                .header {
                    text-align: center;
                }
                .title {
                    text-align: center;
                    font-size: 16px;
                    font-weight: bold;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    border-top: 2px solid black;
                }
                th, td {
                    padding: 3px;
                    text-align: left;
                }
                .party_header, .container_header {
                    font-weight: bold;
                    text-align: left;
                    font-size:12px;
                }
                .party_content, .container_content {
                    text-align: left;
                    font-size:10px;
                }
                .container_header{
                    border-bottom: 2px solid black;
                }

                .footer {
                    border-top: 2px solid black;
                    text-align: left;
                    font-size: 10px;
                }
                .details_content_label {
                    font-size:9px;
                    font-weight:bold;
                }
                .details_content{
                    font-size:9px;
                }
                .details_header{
                    font-size:12px;
                    border-top: 2px solid black;
                    border-bottom: 2px solid black;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <img src="data:image/jpeg;base64,${base64Image}" />
            </div>
            <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="width: 25%; text-align: center;"></td>
                <td style="width: 50%; vertical-align: middle; text-align: center; font-weight: bold;">DELIVERY ORDER</td>
                <td style="width: 25%; vertical-align: bottom; text-align: center; font-size: 9px;">${currentDateTime}</td>
            </tr>
        </table>
            <table border="0">
                <thead>
                    <tr>
                        <th colspan="2" class="party_header">Notify Party</th>
                        <th colspan="2" class="party_header">Consignee</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="party_content" colspan="2">
                            <div>KOREA FOOD PTY LTD</div>
                            <div>26 PIKE STREET</div>
                            <div>RYDALMERE NSW 2116 AUSTRALIA</div>
                        </td>
                        <td class="party_content" colspan="2">
                            <div>KOREA FOOD PTY LTD</div>
                            <div>26 PIKE STREET</div>
                            <div>RYDALMERE NSW 2116 AUSTRALIA</div>
                        </td>
                    </tr>
                    <tr>
                    <td colspan=2 style="text-align:left;width: 50%;">
                    </td>
                    <td colsapn=2 style="font-size: 10px; text-align:left;width: 50%;">
                    Our Ref IS SYD 40432 /1 
                    </td>
                    </tr>
                </tbody>
            </table>
            <table>
        <thead>
            <tr>
                <th class="details_header" colspan=2>EXPRESS RELEASE</th>
                <th class="details_header" colspan=2>Your Ref: </th>
            </tr>
        </thead>
        <tbody>
            <colgroup>
                <col style="width: 20%;">
                <col style="width: 40%;">
                <col style="width: 20%;">
                <col style="width: 40%;">
            </colgroup>
            <tr>
                <td class="details_content_label">House Bill:</td>
                <td class="details_content">Row 1, Column 2</td>
                <td class="details_content_label">Goods:</td>
                <td class="details_content" style="vertical-align:top" rowspan=2>Row 1, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label">Ocean Bill:</td>
                <td class="details_content">Row 2, Column 2</td>
                <td class="details_content_label"></td>
            </tr>
            <tr>
                <td class="details_content_label">Shipper:</td>
                <td class="details_content">Row 3, Column 2</td>
                <td class="details_content_label">Arrival:</td>
                <td class="details_content">Row 3, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label">Vessel/Lloyds:</td>
                <td class="details_content">Row 4, Column 2</td>
                <td class="details_content_label">Weight (kg):</td>
                <td class="details_content">Row 4, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label">Voyage:</td>
                <td class="details_content">Row 5, Column 2</td>
                <td class="details_content_label">Volume(M3):/td>
                <td class="details_content">Row 5, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label">Origin:</td>
                <td class="details_content">Row 6, Column 2</td>
                <td class="details_content_label">Packages:</td>
                <td class="details_content">Row 6, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label">Load:</td>
                <td class="details_content">Row 7, Column 2</td>
                <td class="details_content_label">Discharge:</td>
                <td class="details_content">Row 7, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label" style="vertical-align:top"rowspan=4>Depot:</td>
                <td class="details_content">Row 8, Column 2</td>
                <td class="details_content_label">Dest:</td>
                <td class="details_content">Row 8, Column 4</td>
            </tr>
            <tr>
                <td class="details_content">Row 9, Column 2</td>
                <td class="details_content_label">Final Dest:</td>
                <td class="details_content">Row 9, Column 4</td>
            </tr>
            <tr>
                <td class="details_content">Row 10, Column 2</td>
                <td class="details_content_label">Container Park:</td>
                <td class="details_content">Row 10, Column 4</td>
            </tr>
            <tr>
                <td class="details_content">Row 11, Column 2</td>
                <td class="details_content_label" style="vertical-align:top"rowspan=2>Delivery Notes:</td>
                <td class="details_content">Row 11, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label">Reference:</td>
                <td class="details_content">Row 12, Column 2</td>
                <td class="details_content">Row 12, Column 4</td>
            </tr>
            <tr>
                <td class="details_content_label">Container & Marks:</td>
                <td class="details_content">Row 13, Column 2</td>
                <td class="details_content_label">Trans. Vessel/Voyage:</td>
                <td class="details_content">Row 13, Column 4</td>
            </tr>
        </tbody>
    </table>
            <table  border="0" >
                <thead>
                    <tr>
                        <th class="container_header">Container</th>
                        <th class="container_header">Seal</th>
                        <th class="container_header">Type</th>
                        <th class="container_header">Weight</th>
                        <th class="container_header">Volume</th>
                        <th class="container_header">Package</th>
                    </tr>
                </thead>
                <tbody>
                    ${containerRows}
                </tbody>
            </table>
            <div class="footer">
                <p>
                    This Delivery Order is subject to Customs Clearance and if required, Quarantine Release. Three days free storage will apply from the date of availability. Any bond and storage charges will be for the account of the consignee as stated on this Delivery Order.
                </p>
                <h3><span style="color: blue; font-size:16px">P</span><span style="font-size:16px">N</span><span style="color: red; font-size:16px">L</span> GLOBAL LOGISTICS</h3>
            </div>
        </body>
    </html>
    `;

    const options = {
        format: 'A4',
        border: {
            top: '0.5in',
            right: '0.5in',
            bottom: '0.5in',
            left: '0.5in'
        }
    };

    pdf.create(htmlContent, options).toStream((err, stream) => {
        if (err) return dataCallback(err);
        stream.on('data', dataCallback);
        stream.on('end', endCallback);
    });
}

module.exports = { buildPDF };
