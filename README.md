AppDevBook
==========

"윈도우8 앱 개발 가이드" 앱 소스를 공개합니다.
data.js 파일과 html/css 수정만으로 유튜브에 올린 나만의 비디오를 가지고 윈도우8 앱을 만들 수 있습니다.

[앱 샘플] 

Windows 스토어에서 "윈도우8 앱 개발 가이드" 다운로드하기 : http://apps.microsoft.com/windows/app/windows-8/769f42d0-870a-4b21-93c0-d2ac1497972a

[사용방법]

1. js 폴더의 data.js 파일을 열어서 동영상 그룹 정보를 수정합니다.

        var sampleGroups = [
            { key: "group1", title: "JavaScript를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
            { key: "group2", title: "C#를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
        ];


각 동영상 그룹의 갯수 만큼 { key:... } 부분을 추가합니다. 각 그룹 뒤에는 콤마(,)가 들어가야 합니다.
key는 각 그룹의 고유 이름이 들어가면 되고(group1, group2, group3,...), title에는 그룹의 이름, subtitle에는 부제가 들어가면 됩니다.

2. 각 동영상 그룹의 항목들에 대한 정보를 수정합니다.

        var sampleItems = [
            { group: sampleGroups[0], title: "준비하기", subtitle: "링크", description: "개발을 위해 필요한 툴 설치 파일과 프로젝트와 실습 자료가 포함된 트레이닝킷 다운로드", content: "본 강좌의 내용을 따라서 실습하기 위해서는 Windows 8와 Visual Studio 2012가 필요합니다. 아래 링크에서 Visual Studio 2012를 다운로드 받으세요. <br /><a href='http://msdn.microsoft.com/ko-kr/windows/apps/br229516'>Visual Studio 2012 설치</a><br /><br />이 실습에 사용된 샘플 코드 및 파일들은 아래 링크에서 다운로드 할 수 있습니다.<br /><a href='http://www.microsoft.com/en-us/download/details.aspx?id=29854'>트레이닝킷 다운로드</a>", backgroundImage: lightGray },
            { group: sampleGroups[0], title: "Windows 스토어앱을 위한 플랫폼", subtitle: "설명", description: "스토어앱을 개발하기 위해서 기본이 되는 Windows RT 플랫폼에 대해서 알아봅니다.", content: "", videoId: "RhuaH6t6CtM", backgroundImage: darkGray },

