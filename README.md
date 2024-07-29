# 프론트엔드 개발자 과제 

- 프로젝트명 : myproject
- 프로젝트 설명 :  
  API 사이트와 디자인 사이트를 사용하여      
  사용자 인터페이스를 개발하고, 데이터를 시각화하는   
  웹 애플리케이션을 개발합니다.    
 
- API 사이트 : [Korean JSON](https://koreanjson.com/)  
- 디자인 사이트 : [Overview - Get started - Atlassian Design System](https://atlassian.design/components/)  

- 배포 주소 : 

- 사용:

<div align=left> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
  <br>
 css <br/>
   <img src="https://img.shields.io/badge/Atlassian-0052CC?style=for-the-badge&logo=Atlassian&logoColor=white">
   <img src="https://img.shields.io/badge/Tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">

source management <br/>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
 
</div>






## Table Of Contents
1. [실행 환경 확인](#1-실행-환경-확인)
2. [시작 방법](#2-시작-방법)
3. [폴더 구조](#3-폴더-구조)
4. [컴포넌트 설명](#4-컴포넌트-설명)
5. [유의사항](#5-유의사항)
6. [구현 요구 사항](#6-구현-요구-사항)
     




  


  



   

## 1. 실행 환경 확인
```node -v``` , ```npm -v```로 환경을 확인합니다.  
- Node 18.20.3, npm 10.8.1 에서 잘 작동합니다.    
- 리액트 버전 16, typescript 버전 3.2.1 입니다.

```
"react": "^16.14.0",
"typescript": "^3.2.1",
```



***
## 2. 시작 방법

1. 설치 : ```npm install```

2. 시작 : ```npm start```



<hr/>

## 3. 폴더 구조 
<details><summary>펼치기</summary> 
  
```css
myproject
│  App.tsx
│  index.css
│  index.tsx
│  logo.svg
│  output.css
│  react-app-env.d.ts
│  reportWebVitals.ts
│  setupTests.ts
├─@types
│      react-i18next.d.ts
├─atom
│      atoms.tsx
├─components                            // 공통으로 사용되는 컴포넌트 분리 (자동완성, 네비게이션)
│  │  AutoComplete.tsx
│  │  Navigation.tsx
│  └─pages                              //주요 화면 페이지
│      │  BoardListPage.tsx
│      │  Home.tsx
│      │  TodoListPage.tsx
│      │  UserListPage.tsx
│      └─details                        // 주요 화면의 상세페이지
│              PostDetail.tsx
│              UserDetail.tsx
├─function                              // 공통으로 사용되는 함수 분리
│      createKey.ts
│      formDate.ts                       
│      handleSearchTermChange.ts          
└─locales                               // i18n 을 사용하여 한/영 전환 지원
    │  i18n.ts
    │  index.ts
    ├─en
    │      index.ts
    │      main.json
    └─ko
            index.ts
            main.json
```

 
 
 
 
 </details>
 

 

<hr/>

## 4. 컴포넌트 설명

```Navigation.tsx```
페이지 이동이 가능한 상단 네비게이션과 한/영 전환 버튼이 있음
 
 
```pages``` 폴더 : 주요 화면 페이지

```BoardListPage``` : 게시판 페이지  
```TodoListPage``` : 투두리스트 페이지  
```UserListPage``` : 유저목록 페이지   
  
```details```폴더 : 주요 화면의 상세페이지  
```PostDetail``` : 게시글 상세페이지  
```UserDetail``` : 유저 정보 상세페이지   


## 5. 유의사항

게시글 수정, 유저정보 수정, 댓글 수정 api의 경우    

<span style="color:red">요청은 정상적으로 보내지나, 
return 되어 오는 데이터가 원본데이터와 동일하여</span>

 
  
사용자가 input창에 입력 후 저장을 눌러 요청 api를 보낸 후  
사용자가 입력한 내용이 화면에 보이도록 함.  






 
## 6. 구현 요구 사항
  
#### 
API 사이트와 디자인 사이트를 사용하여 사용자 인터페이스를 개발하고,  
데이터를 시각화하는 웹 애플리케이션을 개발합니다.

#### 
 
요구 사항
1. 개발 언어: React 16.14.0, Typescript  
2. 데이터 연동: API 사이트의 API를 사용합니다.  
3. UI 디자인: ```Atlassian Design``` 시스템의 컴포넌트를 사용하여 UI를 구성합니다.  
4. 기능 구현:
   
#### 사용자 목록 페이지
> 각 사용자 항목을 클릭하면 해당 사용자의 상세 정보를 표시  
>> 사용자 정보 수정  
> 사용자 검색  
>> 자동완성 기능 제공  
> 페이징 기능  

#### 게시물 목록 페이지
> 각 게시물 항목을 클릭하면 해당 게시물의 상세 정보를 표시   
>> 게시물 내에 댓글 목록을 표시  
>> 게시물 / 댓글 수정  
> 게시물 검색 (제목 검색)  
>> 제목 자동완성 기능 제공  
> 날짜를 통한 필터 제공  
>> 페이징 기능  

#### 할일 목록을 표시하는 페이지
> 완료된 할일과 미 완료된 할일을 테이블 내 아이콘으로 분류 가능하도록 표시    

#### 다국어 처리  
> 한 / 영 다국어 기능 지원
> API 사이트의 데이터 외의 텍스트는 다국어 지원
 
</details>


<div align="left">
  
[목차로](#목차)

</div>


 

<hr/>
