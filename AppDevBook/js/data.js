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
            { key: "group1", title: "JavaScript를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
            { key: "group2", title: "C#를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
        ];

        // Each of these sample items should have a reference to a particular
        // group.
        var sampleItems = [
            { group: sampleGroups[0], title: "준비하기", subtitle: "링크", description: "개발을 위해 필요한 툴 설치 파일과 프로젝트와 실습 자료가 포함된 트레이닝킷 다운로드", content: "본 강좌의 내용을 따라서 실습하기 위해서는 Windows 8와 Visual Studio 2012가 필요합니다. 아래 링크에서 Visual Studio 2012를 다운로드 받으세요. <br /><a href='http://msdn.microsoft.com/ko-kr/windows/apps/br229516'>Visual Studio 2012 설치</a><br /><br />이 실습에 사용된 샘플 코드 및 파일들은 아래 링크에서 다운로드 할 수 있습니다.<br /><a href='http://www.microsoft.com/en-us/download/details.aspx?id=29854'>트레이닝킷 다운로드</a>", backgroundImage: lightGray },
            { group: sampleGroups[0], title: "Windows 스토어앱을 위한 플랫폼", subtitle: "설명", description: "스토어앱을 개발하기 위해서 기본이 되는 Windows RT 플랫폼에 대해서 알아봅니다.", content: "", videoId: "RhuaH6t6CtM", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "Windows 스토어 앱 개발", subtitle: "HTML/CSS/JS 실습", description: "간단한 스토어앱 샘플 프로젝트를 통해서 기본 개념을 이해해 봅니다.", content: "", videoId: "RaQ01f45nFQ", backgroundImage: mediumGray },
            { group: sampleGroups[0], title: "Microsoft 디자인 스타일 UI 만들기", subtitle: "설명", description: "Microsoft 디자인 스타일 UI는 어떻게 만들까요? 함께 알아봅니다.", content: "", videoId: "2Hn77YFnfP0", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "화면 방향, 스냅뷰, 시맨틱줌", subtitle: "HTML/CSS/JS 실습", description: "HTML5와 JavaScript로 화면 방향, 스냅뷰, 시맨틱 줌을 구현하는 방법을 알아봅니다.", content: "", videoId: "znVObnJhHF8", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "컨트랙트와 Windows 8 경험을 결합하기", subtitle: "설명", description: "컨트랙트와 Windows 8 경험을 결합하는 방법에 대해 알아봅니다.", content: "", videoId: "6T4TwXlNpEc", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "검색과 공유", subtitle: "HTML/CSS/JS 실습", description: "HTML5와 JavaScript로 검색과 공유 기능을 구현하는 방법을 알아봅니다.", content: "", videoId: "CAI3aL-pNVI", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "Hardware", subtitle: "설명", description: "하드웨어와 결합하는 방법에 대해 설명해드립니다.", content: "", videoId: "oPyTQYhXOYg", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "앱 바와 미디어 캡처", subtitle: "HTML/CSS/JS 실습", description: "HTML5와 JavaScript로 앱 바와 미디어 캡처 구현하는 방법을 알아봅니다.", content: "", videoId: "QAurqoxg1D4", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "Windows 스토어앱이 어떻게, 그리고 언제 작동하는가", subtitle: "설명", description: "Windows 스토어 앱은 어떻게, 그리고 언제 작동할까요?", content: "", videoId: "sA4IdqtSa3w", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "프로세스  실행 관리, 설정 참 메뉴와 환경 설정", subtitle: "HTML/CSS/JS 실습", description: "HTML5와 JavaScript로 프로세스 실행 관리, 설정 참 메뉴와 환경 설정 만드는 방법을 알아봅니다.", content: "", videoId: "-q3bOYi0q5s", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "타일과 알림", subtitle: "설명", description: "타일과 알림을 적절히 활용하는 방법에 대해 알려드립니다.", content: "", videoId: "p06GgqY1o88", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "타일과 알림", subtitle: "HTML/CSS/JS 실습", description: "HTML과 JavaScript를 활용해 타일과 알림을 구현하는 방법을 설명해드립니다.", content: "", videoId: "Sytkj2DnOec", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "Introducing the Windows store", subtitle: "설명", description: "Windows 스토어를 소개해드립니다.", content: "", videoId: "TVJdUnTS1n4", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "The Windows Store APIs", subtitle: "HTML/CSS/JS 실습", description: "HTML과 JavaScript로 Windows Store API를 활용하는 방법을 알려드립니다.", content: "", videoId: "E_C9oMrERDQ", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "파일 입출력 (노트앱 만들기)", subtitle: "HTML/CSS/JS 응용", description: "HTML과 JavaScript를 활용해 파일 입출력 하는 방법을 알려드립니다.", content: "", videoId: "9z2HZ6FWo5g", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "REST API 연동하기 (네트워킹)", subtitle: "HTML/CSS/JS 응용", description: "HTML과 JavaScript를 활용해 REST API를 연동하는 방법을 설명해드립니다.", content: "", videoId: "6NUlojWBz_A", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "동영상/음악 재생", subtitle: "HTML/CSS/JS 응용", description: "HTML과 JavaScript를 활용해 동영상과 음악을 재생할 수 있는 앱을 만드는 방법을 알려드립니다.", content: "", videoId: "BN1v1gT6OLI", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "Local DB 사용", subtitle: "HTML/CSS/JS 응용", description: "HTML과 JavaScript를 활용해 Local DB를 사용하는 방법을 알려드립니다.", content: "", videoId: "aiELap3cHtc", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "Touch", subtitle: "HTML/CSS/JS 응용", description: "HTML/JS를 이용해서 터치 기능을 어떻게 구현하는지 알아봅니다.", content: "", videoId: "HQL9JCP9qLg", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "하드웨어 센서", subtitle: "HTML/CSS/JS 응용", description: "HTML과 JavaScript를 활용해 하드웨어 센서를 앱 개발에 접목하는 방법을 알려드립니다.", content: "", videoId: "IOwE-97UOcg", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "LiveSDK 활용", subtitle: "HTML/CSS/JS 응용", description: "LiveSDK와 파일 싱크에 대해서 알아봅니다.", content: "", videoId: "tricyVuPnfA", backgroundImage: darkGray },
            { group: sampleGroups[0], title: "개발자를 위한 Internet Explorer 10", subtitle: "설명", description: "개발자들이 알아야할 Internet Explorer 10의 특징과 기능은 무엇일까요?", content: "", videoId: "wvCA_rFzP-c", backgroundImage: darkGray },

            { group: sampleGroups[1], title: "준비하기", subtitle: "준비", description: "개발을 위해 필요한 툴 설치 파일과 프로젝트와 실습 자료가 포함된 트레이닝킷 다운로드", content: "본 강좌의 내용을 따라서 실습하기 위해서는 Windows 8와 Visual Studio 2012가 필요합니다. 아래 링크에서 Visual Studio 2012를 다운로드 받으세요. <br /><a href='http://msdn.microsoft.com/ko-kr/windows/apps/br229516'>Visual Studio 2012 설치</a><br /><br />이 실습에 사용된 샘플 코드 및 파일들은 아래 링크에서 다운로드 할 수 있습니다.<br /><a href='http://www.microsoft.com/en-us/download/details.aspx?id=29854'>트레이닝킷 다운로드</a>", backgroundImage: lightGray },
            { group: sampleGroups[1], title: "Windows 스토어앱을 위한 플랫폼", subtitle: "설명", description: "스토어앱을 개발하기 위해서 기본이 되는 Windows RT 플랫폼에 대해서 알아봅니다.", content: "", videoId: "RhuaH6t6CtM", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "Windows 스토어 앱 개발", subtitle: "C#/XAML 실습", description: "간단한 스토어앱 샘플 프로젝트를 통해서 기본 개념을 이해해 봅니다.", content: "", videoId: "Qu1K1-GoyNo", backgroundImage: mediumGray },
            { group: sampleGroups[1], title: "Microsoft 디자인 스타일 UI 만들기", subtitle: "설명", description: "Microsoft 디자인 스타일 UI는 어떻게 만들까요? 함께 알아봅니다.", content: "", videoId: "2Hn77YFnfP0", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "화면 방향, 스냅뷰, 시맨틱줌", subtitle: "C#/XAML 실습", description: "C#/XAML로 화면 방향, 스냅뷰, 시맨틱 줌을 구현하는 방법을 알아봅니다.", content: "", videoId: "Dp4aozJqUUs", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "컨트랙트와 Windows 8 경험을 결합하기", subtitle: "설명", description: "컨트랙트와 Windows 8 경험을 결합하는 방법에 대해 알아봅니다.", content: "", videoId: "6T4TwXlNpEc", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "검색과 공유", subtitle: "C#/XAML 실습", description: "C#/XAML로 검색과 공유 기능을 구현하는 방법을 알아봅니다.", content: "", videoId: "8ip7WLqWvbs", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "Hardware", subtitle: "설명", description: "하드웨어와 결합하는 방법에 대해 설명해드립니다.", content: "", videoId: "oPyTQYhXOYg", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "앱 바와 미디어 캡처", subtitle: "C#/XAML 실습", description: "C#/XAML로 앱 바와 미디어 캡처 구현하는 방법을 알아봅니다.", content: "", videoId: "U8Cs-HX6Uk4", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "Windows 스토어앱이 어떻게, 그리고 언제 작동하는가", subtitle: "설명", description: "Windows 스토어 앱은 어떻게, 그리고 언제 작동할까요?", content: "", videoId: "sA4IdqtSa3w", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "프로세스  실행 관리, 설정 참 메뉴와 환경 설정", subtitle: "C#/XAML 실습", description: "C#/XAML로 프로세스 실행 관리, 설정 참 메뉴와 환경 설정 만드는 방법을 알아봅니다.", content: "", videoId: "SskSgTYKsoc", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "타일과 알림", subtitle: "설명", description: "타일과 알림을 적절히 활용하는 방법에 대해 알려드립니다.", content: "", videoId: "p06GgqY1o88", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "타일과 알림", subtitle: "C#/XAML 실습", description: "C#/XAML를 활용해 타일과 알림을 구현하는 방법을 설명해드립니다.", content: "", videoId: "2-I5WaRniPo", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "Introducing the Windows store", subtitle: "설명", description: "Windows 스토어를 소개해드립니다.", content: "", videoId: "TVJdUnTS1n4", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "The Windows Store APIs", subtitle: "C#/XAML n실습", description: "C#/XAML를 Windows Store API를 활용하는 방법을 알려드립니다.", content: "", videoId: "KogP_tu5uWE", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "파일 입출력 (노트앱 만들기)", subtitle: "C#/XAML 응용", description: "C#/XAML를 활용해 파일 입출력 하는 방법을 알려드립니다.", content: "", videoId: "OiIbrID5E0c", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "REST API 연동하기 (네트워킹)", subtitle: "C#/XAML 응용", description: "C#/XAML를 활용해 REST API를 연동하는 방법을 설명해드립니다.", content: "", videoId: "BLQy8kAi6YY", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "음악, 동영상 플레이어 만들기", subtitle: "C#/XAML 응용", description: "C#/XAML를 활용해 동영상과 음악을 재생할 수 있는 앱을 만드는 방법을 알려드립니다.", content: "", videoId: "COUAvuFnf3M", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "LocalDB(SQLite) 사용법", subtitle: "C#/XAML 응용", description: "C#/XAML를 활용해 Local DB를 사용하는 방법을 알려드립니다.", content: "", videoId: "txxALUNrMi8", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "Touch 활용하기", subtitle: "C#/XAML 응용", description: "C#/XAML를 이용해서 터치 기능을 어떻게 구현하는지 알아봅니다.", content: "", videoId: "cZWimo7awN8", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "센서의 활용 방법", subtitle: "C#/XAML 응용", description: "C#/XAML를 활용해 하드웨어 센서를 앱 개발에 접목하는 방법을 알려드립니다.", content: "", videoId: "aFscZQCtsO4", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "Azure Mobile 서비스", subtitle: "C#/XAML 응용", description: "여러분의 앱을 Azure Mobile 서비스와 결합해보십시오.", content: "", videoId: "Ne9z5PUjYN8", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "SkyDrive와 파일 연동하기", subtitle: "C#/XAML 응용", description: "LiveSDK와 파일 싱크에 대해서 알아봅니다.", content: "", videoId: "8-X4e4dXPGk", backgroundImage: darkGray },
            { group: sampleGroups[1], title: "개발자를 위한 Internet Explorer 10", subtitle: "설명", description: "개발자들이 알아야할 Internet Explorer 10의 특징과 기능은 무엇일까요?", content: "", videoId: "wvCA_rFzP-c", backgroundImage: darkGray },

        ];

        var g, imgBig, imgSmall;
        for (var i = 0; i < sampleItems.length; i++) {
            g = sampleItems[i].group;
            if (sampleItems[i].videoId) {
                imgBig = "http://img.youtube.com/vi/" + sampleItems[i].videoId + "/0.jpg";
                imgSmall = "http://img.youtube.com/vi/" + sampleItems[i].videoId + "/1.jpg";
                sampleItems[i].backgroundImage = imgSmall;
                if (g.backgroundImage == darkGray) g.backgroundImage = imgBig;
            }
        }

        return sampleItems;
    }
})();
