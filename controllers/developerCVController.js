// app.post("/api/create-html", (req, res) => {
const fs = require("fs");
const Handlebars = require("handlebars");
const puppeteer = require("puppeteer");
const db = require("../models");

// create main model
const developerCVModel = db.developerCV;
exports.postCreateCV = (req, res) => {
  const templateContent = fs.readFileSync("index.html", "utf8");
  // require("../")
  // Compile the template
  const template = Handlebars.compile(templateContent);

  // Generate HTML content by passing data to the template
  const htmlContent = template(req.body);

  // Write the HTML content to a file
  fs.writeFileSync("user_info.html", htmlContent);

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the HTML content on the page
    await page.setContent(htmlContent);

    await page.evaluate(() => {
      const style = document.createElement("style");
      style.textContent = `
          @media screen {
            body { visibility: hidden; }
          }
          @media print {
            body { visibility: visible; }
          }
        `;
      document.head.appendChild(style);
    });
    const fileName = `${req.body.name.trim()}_${req.body.designation.trim()}_${
      req.body.devExperiences
    }+Exp.pdf`;
    // Generate PDF
    await page.pdf({
      path: `uploads/DeveloperCV/${fileName}`,
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    console.log("PDF file generated successfully.");
    const info = {
      userId: req.body.userId,
      path: `/uploads/DeveloperCV/${fileName}`,
    };
    const candidate = await developerCVModel.create(info);
    return res.status(200).json({
      message: "CV Genrated successfully",
      data: candidate.path,
    });
    // return res.sendFile(`${__dirname}/DeveloperCV/${req.body.name}.pdf`);
  })();
};
