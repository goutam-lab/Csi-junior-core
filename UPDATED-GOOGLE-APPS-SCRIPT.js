// ============================================
// UPDATED GOOGLE APPS SCRIPT CODE
// WITH MULTI-SELECT TEAMS SUPPORT
// ============================================
//
// INSTRUCTIONS:
// 1. Go to your Google Apps Script editor
// 2. Replace ALL existing code with this
// 3. Save and Deploy as new version
//
// ============================================

var SHEET_ID = "1XNiJp4oA-4cCgCTrdyn78BYgt3BBtK5Uu0lJucFt5vk";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Parse the incoming data from our Next.js API
    var data = JSON.parse(e.postData.contents);

    // Log for debugging
    Logger.log("Received data: " + JSON.stringify(data));

    // Convert teams array to comma-separated string
    // Example: ["Tech", "Design", "PR"] becomes "Tech, Design, PR"
    var teamsString = data.teams ? data.teams.join(", ") : "";

    // Create a new row with the data
    // The order must match your columns in the sheet
    var newRow = [
      new Date(), // Column A: Timestamp
      data.name, // Column B: Name
      data.enrollment, // Column C: Enrollment
      data.course, // Column D: Course
      data.phone, // Column E: Phone
      data.residency, // Column F: Residency Type (Hosteller/Day Scholar)
      teamsString, // Column G: Team Choices (comma-separated)
      data.why, // Column H: Why
      data.portfolio, // Column I: Portfolio
      data.experience, // Column J: Experience
    ];

    // Log the row before appending
    Logger.log("Appending row: " + JSON.stringify(newRow));

    // Append the new row to the sheet
    sheet.appendRow(newRow);

    // Return a success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        data: JSON.stringify(data),
        teams: teamsString,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error: " + error.toString());

    // Return an error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.message,
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        name: "Test User",
        enrollment: "E23BU1234",
        course: "B.Tech CSE",
        phone: "9876543210",
        residency: "Hosteller",
        teams: ["Tech", "Design", "PR"], // Array of teams
        why: "I want to join CSI because I love technology and want to learn more.",
        portfolio: "https://github.com/testuser",
        experience: "Worked on several projects",
      }),
    },
  };

  var result = doPost(testData);
  Logger.log("Test result: " + result.getContent());
}
