function cycleThirds(sizeType) {
    // Plasma 6 uses activeWindow instead of activeClient
    var window = workspace.activeWindow;
    if (!window) return;

    // Get the placement area for the current window
    var area = workspace.clientArea(KWin.PlacementArea, window);

    // Calculate positions based on screen geometry
    var oneThirdWidth = Math.round(area.width * 0.33);
    var twoThirdsWidth = Math.round(area.width * 0.66);
    var threeFifthsWidth = Math.round(area.width * 3 / 5);

    // Plasma 6 uses frameGeometry instead of geometry
    var currentRelativeX = window.frameGeometry.x - area.x;

    if (sizeType === 1) {
        // Meta+G Cycle Logic: Left 1/3 -> Center 1/3 -> Right 1/3 -> back to Left
        if (currentRelativeX <= 10) {
            // Currently Left -> Move to Center
            window.frameGeometry = { x: area.x + oneThirdWidth, y: area.y, width: oneThirdWidth, height: area.height };
        } else if (Math.abs(currentRelativeX - oneThirdWidth) < 20) {
            // Currently Center -> Move to Right
            window.frameGeometry = { x: area.x + twoThirdsWidth, y: area.y, width: area.width - twoThirdsWidth, height: area.height };
        } else {
            // Anywhere else (or Right) -> Reset to Left
            window.frameGeometry = { x: area.x, y: area.y, width: oneThirdWidth, height: area.height };
        }
    }
    else if (sizeType === 2) {
        // Meta+D Cycle Logic: Left 2/3 -> Right 2/3 -> back to Left
        if (currentRelativeX <= 10) {
            // Currently Left -> Move to Right
            window.frameGeometry = { x: area.x + oneThirdWidth, y: area.y, width: area.width - oneThirdWidth, height: area.height };
        } else {
            // Anywhere else (or Right) -> Reset to Left
            window.frameGeometry = { x: area.x, y: area.y, width: twoThirdsWidth, height: area.height };
        }
    }
    else if (sizeType === 3) {
        // Meta+G: Center the window at 3/5 of the placement area's width
        window.frameGeometry = {
            x: area.x + Math.round((area.width - threeFifthsWidth) / 2),
            y: area.y,
            width: threeFifthsWidth,
            height: area.height
        };
    }
}

// Register the layout hotkeys (using sizeType flags 1, 2, and 3)
registerShortcut("Cycle 1/3 Width", "Cycle 1/3 layout left-to-right", "Meta+D", function() { cycleThirds(1); });
registerShortcut("Cycle 2/3 Width", "Cycle 2/3 layout left-to-right", "Meta+F", function() { cycleThirds(2); });
registerShortcut("Center 3/5 Width", "Center window at 3/5 screen width", "Meta+G", function() { cycleThirds(3); });



/*
save as: ~/.local/share/kwin/scripts/thirds-tiler/contents/code/main.js

plus a metadata.json at the root of thirds-tiler
{
  "KPlugin": {
    "Authors": [
      {
        "Name": "Jakob"
      }
    ],
    "Category": "Window Management",
    "Description": "Tiler vinduer i tredjedele",
    "Icon": "preferences-system-windows-script",
    "Id": "thirds-tiler",
    "Name": "Thirds Tiler",
    "ServiceTypes": ["KWin/Script"],
    "Version": "1.0"
  },
  "X-Plasma-API": "javascript",
  "X-Plasma-MainScript": "code/main.js",
  "KPackageStructure": "KWin/Script"
}

Register scrip with (kde6):
kpackagetool6 -t KWin/Script -i ./


Reload script with (kde6):
kpackagetool6 -t KWin/Script -u ./

Restart wayland:
qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.unloadScript "thirds-tiler"
qdbus org.kde.KWin /Scripting org.kde.kwin.Scripting.loadScript "thirds-tiler"

or restart plasma
kwin_wayland --replace & disown

*/
