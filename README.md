AppDevBook
==========

"윈도우8 앱 개발 가이드" 앱 소스를 공개합니다.
data.js 파일과 html/css 수정만으로 유튜브에 올린 나만의 비디오를 가지고 윈도우8 앱을 만들 수 있습니다.

[앱 샘플] 

Windows 스토어에서 "윈도우8 앱 개발 가이드" 다운로드하기 : http://apps.microsoft.com/windows/app/windows-8/769f42d0-870a-4b21-93c0-d2ac1497972a

[사용방법]

1. js 폴더의 data.js 파일을 열어서 동영상 정보를 수정합니다.


'''javascript

// 비디오 그룹 정보 입력 부분
// title = 그룹 제목
// subtitle = 부제
var sampleGroups = [
            { key: "group1", title: "JavaScript를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
            { key: "group2", title: "C#를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
        ];

// 비디오 정보 입력 부분
// group = 포함될 그룹 아이템([]안의 숫자로 지정. 0부터 시작)
// title = 비디오 제목
// subtitle = 비디오 부제 또는 종류
// description = 비디오 설명
// content = 비디오 외에 설명이 들어가야 하는 경우 추가(HTML 지원, 코드에 따옴표가 들어가는 경우 홀따옴표[''] 사용)
// videoId = 유튜브 비디오 ID. 유튜브 동영상 페이지 주소에서 마지막 11자리 코드 입력. videoId가 없는 경우 비디오 플레이어 없이 content 내용만 보여짐.
// 예) 동영상 페이지가 http://www.youtube.com/watch?v=ufhtCjXbjtw 인 경우, ufhtCjXbjtw를 videoId로 입력
        // Each of these sample items should have a reference to a particular
        // group.

// 첫번째 그룹의 항목 추가. sampleGroups[0]으로 적용.
        var sampleItems = [
            { group: sampleGroups[0], title: "준비하기", subtitle: "링크", description: "개발을 위해 필요한 툴 설치 파일과 프로젝트와 실습 자료가 포함된 트레이닝킷 다운로드", content: "본 강좌의 내용을 따라서 실습하기 위해서는 Windows 8와 Visual Studio 2012가 필요합니다. 아래 링크에서 Visual Studio 2012를 다운로드 받으세요. <br /><a href='http://msdn.microsoft.com/ko-kr/windows/apps/br229516'>Visual Studio 2012 설치</a><br /><br />이 실습에 사용된 샘플 코드 및 파일들은 아래 링크에서 다운로드 할 수 있습니다.<br /><a href='http://www.microsoft.com/en-us/download/details.aspx?id=29854'>트레이닝킷 다운로드</a>", backgroundImage: lightGray },
            { group: sampleGroups[0], title: "Windows 스토어앱을 위한 플랫폼", subtitle: "설명", description: "스토어앱을 개발하기 위해서 기본이 되는 Windows RT 플랫폼에 대해서 알아봅니다.", content: "", videoId: "RhuaH6t6CtM", backgroundImage: darkGray },
            
// 두번째 그룹의 항목 추가. sampleGroups[1]으로 적용.

            { group: sampleGroups[1], title: "준비하기", subtitle: "준비", description: "개발을 위해 필요한 툴 설치 파일과 프로젝트와 실습 자료가 포함된 트레이닝킷 다운로드", content: "본 강좌의 내용을 따라서 실습하기 위해서는 Windows 8와 Visual Studio 2012가 필요합니다. 아래 링크에서 Visual Studio 2012를 다운로드 받으세요. <br /><a href='http://msdn.microsoft.com/ko-kr/windows/apps/br229516'>Visual Studio 2012 설치</a><br /><br />이 실습에 사용된 샘플 코드 및 파일들은 아래 링크에서 다운로드 할 수 있습니다.<br /><a href='http://www.microsoft.com/en-us/download/details.aspx?id=29854'>트레이닝킷 다운로드</a>", backgroundImage: lightGray },
            { group: sampleGroups[1], title: "Windows 스토어앱을 위한 플랫폼", subtitle: "설명", description: "스토어앱을 개발하기 위해서 기본이 되는 Windows RT 플랫폼에 대해서 알아봅니다.", content: "", videoId: "RhuaH6t6CtM", backgroundImage: darkGray },

...

        ];
'''
