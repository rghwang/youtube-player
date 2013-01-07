AppDevBook
==========

"윈도우8 앱 개발 가이드" 앱 소스를 공개합니다.
data.js 파일과 html/css 수정만으로 유튜브에 올린 나만의 비디오를 가지고 윈도우8 앱을 만들 수 있습니다.

[앱 샘플] 

Windows 스토어에서 "윈도우8 앱 개발 가이드" 다운로드하기 : http://apps.microsoft.com/windows/app/windows-8/769f42d0-870a-4b21-93c0-d2ac1497972a

[사용방법]

1. js 폴더의 data.js 파일을 열어서 동영상 정보를 수정합니다.

        var sampleGroups = [
            { key: "group1", title: "JavaScript를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
            { key: "group2", title: "C#를 이용한 앱 개발", subtitle: "Windows 8 스토어 앱 개발", backgroundImage: darkGray },
        ];


각 동영상 그룹의 갯수 만큼 {} 부분을 추가합니다. 각 그룹 뒤에는 콤마(,)가 들어가야 합니다.
key는 각 그룹의 고유 이름이 들어가면 되고(group1, group2, group3,...), title에는 그룹의 이름, subtitle에는 부제가 들어가면 됩니다.
