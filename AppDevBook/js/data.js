(function () {
    "use strict";

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: Replace the data with your real data.
    // You can add data from asynchronous sources whenever it becomes available.
    generateSampleData().forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.define("Data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemReference: getItemReference,
        getItemsFromGroup: getItemsFromGroup,
        getIndexInGroup:getIndexInGroup,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    // Get the unique group corresponding to the provided group key.
    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    // Get a unique item from the provided string array, which should contain a
    // group key and an item title.
    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    function getIndexInGroup(item) {
        var count = 0, len, key = item.key;
        for (var i = 0; i < groupedItems.groups.length; i++) {
            len = getItemsFromGroup(groupedItems.groups.getAt(i)).length;
            if (key < count + len) break;
            else count += len;
        }
        return key - count-1;
    }

    // Returns an array of sample data that can be added to the application's
    // data list. 
    function generateSampleData() {
        // These three strings encode placeholder images. You will want to set the
        // backgroundImage property in your real data to be URLs to images.
        var darkGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY3B0cPoPAANMAcOba1BlAAAAAElFTkSuQmCC";
        var lightGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY7h4+cp/AAhpA3h+ANDKAAAAAElFTkSuQmCC";
        var mediumGray = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXY5g8dcZ/AAY/AsAlWFQ+AAAAAElFTkSuQmCC";

        // Each of these sample groups must have a unique key to be displayed
        // separately.
        var sampleGroups = [
            { key: "group1", title: "LOL 베인 공략" }
        ];

        // Each of these sample items should have a reference to a particular
        // group.

        var sampleItems = [
            { title: "기본 조작법", subtitle: "How to Play Vayne", url: "http://www.youtube.com/watch?v=2Oxy8LeR_6o" },
            { title: "멀티킬", subtitle:"LOL 베인 1:5 펜타킬", url: "http://www.youtube.com/watch?v=B6Zcffq6Rzc" },
            { title: "탑랭커 영상", subtitle: "제닉스 스톰 베인플레이", url: "http://www.youtube.com/watch?v=BHgcNLqf5SY" },
            { title: "탑랭커 영상", subtitle: "베인#1 랭커 초대석", url: "http://www.youtube.com/watch?v=2Kj7CbLF40M" },
            { title: "챔피언 공략(웹)", subtitle: "인벤 챔피언 정보 페이지", url: "http://lol.inven.co.kr/dataninfo/champion/detail.php?code=71" },
        ];
        var g, url, imgBig, imgSmall;
        for (var i = 0; i < sampleItems.length; i++) {
            g = sampleItems[i].group = sampleGroups[0];
            url = sampleItems[i].url;
            sampleItems[i].videoId = url.substr(url.indexOf("?v=") + 3, 11);
            if (url.indexOf("?v=") == -1) sampleItems[i].videoId = null;
            if (sampleItems[i].videoId ) {
                imgBig = "http://img.youtube.com/vi/" + sampleItems[i].videoId + "/0.jpg";
                imgSmall = "http://img.youtube.com/vi/" + sampleItems[i].videoId + "/1.jpg";
                sampleItems[i].backgroundImage = imgSmall;
                if (g.backgroundImage == darkGray) g.backgroundImage = imgBig;
            } else {
                sampleItems[i].backgroundImage = "./images/inven.png";
            }
        }
        
        return sampleItems;
    }
})();
