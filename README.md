윈도우8 앱 개발 가이드 소스코드 사용법
==========

"윈도우8 앱 개발 가이드" 앱 소스를 공개합니다.
data.js 파일과 html/css 수정만으로 유튜브에 올린 나만의 비디오를 가지고 윈도우8 앱을 만들 수 있습니다.

[앱 샘플] 

Windows 스토어에서 "윈도우8 앱 개발 가이드" 보기 : http://apps.microsoft.com/windows/app/windows-8/769f42d0-870a-4b21-93c0-d2ac1497972a

[소스 다운로드]

 AppDevBook 프로젝트 페이지(https://github.com/rghwang/AppDevBook)에서 상단 메뉴의 ZIP 버튼을 클릭하여 프로젝트 소스의 압축파일을 다운로드 받습니다.

[사용방법]

1. AppDevBook.sln 프로젝트 파일을 Visual Studio 2012에서 열고, js 폴더의 data.js 파일을 열어서 동영상 그룹 정보를 수정합니다.

        var sampleGroups = [
            { key: "group1", title: "JavaScript를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
            { key: "group2", title: "C#를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
        ];


 각 동영상 그룹의 갯수 만큼 { key:... } 부분을 추가합니다. 각 그룹 뒤에는 콤마(,)가 들어가야 합니다.
 key는 각 그룹의 고유 이름이 들어가면 되고(group1, group2, group3,...), title에는 그룹의 이름, subtitle에는 부제가 들어가면 됩니다.



2. 같은 파일에서 각 그룹별 동영상 항목들에 대한 정보를 수정합니다.

        var sampleItems = [
            { group: sampleGroups[0], title: "준비하기", subtitle: "링크", description: "개발을 위해 필요한 툴 설치 파일과 프로젝트와 실습 자료가 포함된 트레이닝킷 다운로드", content: "본 강좌의 내용을 따라서 실습하기 위해서는 Windows 8와 Visual Studio 2012가 필요합니다. 아래 링크에서 Visual Studio 2012를 다운로드 받으세요. <br /><a href='http://msdn.microsoft.com/ko-kr/windows/apps/br229516'>Visual Studio 2012 설치</a><br /><br />이 실습에 사용된 샘플 코드 및 파일들은 아래 링크에서 다운로드 할 수 있습니다.<br /><a href='http://www.microsoft.com/en-us/download/details.aspx?id=29854'>트레이닝킷 다운로드</a>", backgroundImage: lightGray },
            { group: sampleGroups[0], title: "Windows 스토어앱을 위한 플랫폼", subtitle: "설명", description: "스토어앱을 개발하기 위해서 기본이 되는 Windows RT 플랫폼에 대해서 알아봅니다.", content: "", videoId: "RhuaH6t6CtM", backgroundImage: darkGray },
        ];


 각 동영상 항목들은 { group:... } 로 정의합니다. 각 항목들은 마지막에 콤마(,)로 구분해야 합니다.
 sampleGroups[숫자]에서 숫자는 동영상 항목이 속하는 그룹을 의미합니다. 0부터 시작하는 일련번호를 갖습니다.(3번째 그룹에 속한 항목은 sampleGroups[2]와 같이 수정) 
 동영상 항목들에 대한 정보를 각각 title(제목), subtitle(부제), description(설명), content(동영상 페이지에 추가할 내용), videoId(유튜브 비디오 ID)와 같이 추가합니다.
 유튜브 비디오 ID는 유튜브 동영상 페이지에서 주소 창에 마지막 11자리 코드를 복사해서 입력하면 됩니다. 


3. pages/items 폴더에 있는 items.html 파일에서 아래 부분을 수정합니다. 앱 첫화면에서 표시되는 제목 타이틀을 나타냅니다.

                <span class="pagetitle">Windows 8 앱 개발 가이드</span>

4. js 폴더의 default.js 파일의 개인 정보 보호 정책 페이지의 URL을 수정합니다.

        var uri = Windows.Foundation.Uri("http://uxfactory.tistory.com/10");


 인터넷 접속을 하는 모든 앱은 스토어 인증 요구사항에 따라서 개인 정보 보호 정책 페이지의 링크를 제공해야 합니다. 앱 제출 시에 설명에도 같은 URL을 반드시 추가해야 합니다. 개인 정보 보호 정책 페이지에는 "개인 정보를 수집하지 않습니다."와 같은 최소한의 적절한 문구가 제공되면 됩니다.

5. images 폴더의 로고 파일(logo.png, smalllogo.png, storelogo.png, widelogo.png)와 스플레시 스크린 이미지(splashscreen.png)를 교체합니다. 기존 파일 이름과 동일하게 하고, 사이즈도 아래와 같이 정확하게 제공해야 합니다.

 logo.png - 150 x 150 px

 smalllogo.png - 30 x 30 px

 storelogo.png - 50 x 50 px

 widelogo.png - 310 x 150 px

 splashscreen.png - 620 x 300 px


6. package.appxmanifest 파일을 앱 내용에 맞게 수정합니다. 수정해야 할 부분은 아래와 같습니다.

 [Application UI] 탭

  Display name : 앱 이름

  Description : 앱에 대한 설명

 [Packaging] 탭

  Package display name: 앱 이름

  Publisher display name: 제공자 이름


