# Multi-Select Teams Feature - Implementation Guide

## ✨ What Changed

Users can now select **1 to 3 teams** instead of just one team.

### Form Changes:

- ✅ Changed from dropdown to **checkboxes**
- ✅ Users can select **minimum 1, maximum 3 teams**
- ✅ Checkboxes are disabled after selecting 3 teams
- ✅ Portfolio field shows if ANY selected team requires it (Tech, Multimedia, or Design)

### Data Storage:

- Teams are stored as a **comma-separated string** in Google Sheets
- Example: `"Tech, Design, PR"` or `"Management"` (if only one selected)

## 📋 Google Sheet Column Structure

Your Google Sheet will now have this structure:

| Column | Field            | Example                    |
| ------ | ---------------- | -------------------------- |
| A      | Timestamp        | 2024-01-15 10:30:00        |
| B      | Name             | John Doe                   |
| C      | Enrollment       | E23BU1234                  |
| D      | Course           | B.Tech CSE                 |
| E      | Phone            | 9876543210                 |
| F      | Residency Type   | Hosteller                  |
| G      | **Team Choices** | **Tech, Design, PR**       |
| H      | Why Join CSI     | I love technology...       |
| I      | Portfolio        | https://github.com/johndoe |
| J      | Experience       | Worked on projects...      |

## 🔧 Setup Instructions

### Step 1: Update Google Apps Script

1. Open your Google Apps Script editor
2. **Delete ALL existing code**
3. Copy the code from `UPDATED-GOOGLE-APPS-SCRIPT.js`
4. Paste it into the editor
5. Click **Save** (💾)

### Step 2: Test the Script (Optional but Recommended)

1. In the script editor, select `testDoPost` from the function dropdown
2. Click **Run** (▶️)
3. Check your Google Sheet - you should see a test row with:
   - Name: "Test User"
   - Teams: "Tech, Design, PR"
4. If this works, delete the test row and proceed

### Step 3: Deploy New Version

1. Click **Deploy** > **Manage deployments**
2. Click the **Edit** icon (✏️) next to your existing deployment
3. Click **Version** dropdown > **New version**
4. Add description: "Added multi-select teams support"
5. Click **Deploy**
6. You should see "Deployment successfully updated"

**Note:** You don't need to update the URL in your Next.js app if you're updating an existing deployment!

### Step 4: Update Google Sheet Headers (Recommended)

Update Column G header from:

- ❌ Old: `Team Choice`
- ✅ New: `Team Choices` or `Teams`

## 🎨 How It Looks

### Form UI:

```
Team Choices (Select 1-3)
You can select up to 3 teams you'd like to join.

☐ Tech          ☐ Multimedia
☐ Research      ☐ Management
☐ PR            ☐ Sponsorship
☐ Design
```

### After Selecting 3 Teams:

```
☑ Tech          ☑ Design
☐ Research      ☐ Management (disabled)
☑ PR            ☐ Sponsorship (disabled)
☐ Design (disabled)
```

## 🧪 Testing

1. **Open your form** in the browser
2. **Try selecting 1 team** - should work ✅
3. **Try selecting 2 teams** - should work ✅
4. **Try selecting 3 teams** - should work ✅
5. **Try selecting 4th team** - should be disabled ✅
6. **Uncheck one team** - other checkboxes should become enabled ✅
7. **Submit the form**
8. **Check Google Sheet** - Column G should show: "Team1, Team2, Team3"

## 📊 Data Examples in Google Sheet

### Example 1: User selected 1 team

```
Column G: "Tech"
```

### Example 2: User selected 2 teams

```
Column G: "Tech, Design"
```

### Example 3: User selected 3 teams

```
Column G: "Tech, Design, PR"
```

## 🔍 Troubleshooting

### Issue: Checkboxes not appearing

**Solution:** Make sure you have the checkbox component. Check if `components/ui/checkbox.tsx` exists.

### Issue: Can't select any teams

**Solution:**

1. Open browser console (F12)
2. Look for errors
3. Make sure the form is properly updated

### Issue: Teams not appearing in Google Sheet

**Solution:**

1. Check if you updated the Google Apps Script
2. Make sure you deployed the new version
3. Check the script execution logs for errors

### Issue: Portfolio field not showing when selecting Tech/Design/Multimedia

**Solution:** The logic checks if ANY selected team requires portfolio. This should work automatically.

## 💡 Benefits

1. **More Flexibility**: Users can express interest in multiple teams
2. **Better Data**: You can see all team preferences at once
3. **User-Friendly**: Clear visual feedback with checkboxes
4. **Validation**: Prevents selecting too many teams

## 📝 Notes

- The teams are stored as a **comma-separated string** in one cell
- If you want to analyze team preferences, you can use Google Sheets formulas to split the string
- Example formula to count "Tech" selections: `=COUNTIF(G:G,"*Tech*")`
