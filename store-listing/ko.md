# Chrome 웹 스토어 등록정보 — 한국어

## 제품 이름

gRPC Request Inspector

## 요약

Chrome DevTools에서 gRPC-Web, Connect-Web, protobuf-ts 요청을 검사·검색·편집하고 다시 전송하세요.

## 자세한 설명

Chrome DevTools를 벗어나지 않고 브라우저의 RPC 트래픽을 디버깅하세요.

gRPC Request Inspector는 웹 애플리케이션이 gRPC-Web, Connect-Web, protobuf-ts 클라이언트를 통해 보내는 요청을 이해하기 위한 전용 네트워크 패널을 제공합니다.

주요 기능:

- Unary 및 서버 스트리밍 RPC 동작을 실시간으로 캡처합니다.
- 요청 JSON, 응답 JSON, 스트림 메시지, 상태 및 오류를 확인합니다.
- 큰 JSON 페이로드를 검색하고 일치 항목 사이를 빠르게 이동합니다.
- 캡처된 unary 요청을 편집한 뒤 원래 페이지 프레임을 통해 다시 전송합니다.
- 편집 후 재전송된 호출을 Edited 배지와 원본 요청 정보로 즉시 구분합니다.
- 프레임 URL, 백엔드 URL, 시작·완료 시각, 소요 시간, 첫 메시지까지 걸린 시간(TTFM), 메시지 수로 지연을 분석합니다.
- Connect-Web 및 protobuf-ts 메시지에서 기본값을 가진 protobuf 스칼라 필드도 표시합니다.
- 라이트·다크 테마를 지원하는 명확하고 반응성 좋은 인터페이스를 제공합니다.
- 유휴 상태나 확장 프로그램 재시작 후에도 연결을 안정적으로 복구합니다.

재전송 기능은 확장 프로그램이 이미 캡처한 요청에만 사용할 수 있습니다. 재전송하면 실제 백엔드 요청이 발생하며 캡처 당시의 인증 및 메타데이터가 재사용될 수 있으므로, 보내기 전에 편집한 JSON을 반드시 확인하세요.

설정 가이드:
https://github.com/jhyang12345/grpc-web-inspector-guide/blob/main/SETUP.md

소스 코드 및 이슈 트래커:
https://github.com/jhyang12345/grpc-web-devtools

## 최신 업데이트

이번 버전에서는 단순 조회 중심이던 인스펙터를 능동적인 디버깅 도구로 확장했습니다. 캡처한 unary 요청의 JSON을 편집해 원래 프레임을 통해 다시 전송할 수 있고, Edited 배지와 원본 요청 정보로 재전송된 호출을 구분할 수 있습니다. 백엔드 URL, 시작·완료 시각, 전체 소요 시간, 첫 메시지까지 걸린 시간(TTFM), 메시지 수 등 요청 생명주기 정보도 더 자세히 확인할 수 있습니다. 또한 protobuf-ts의 unary 및 서버 스트리밍 캡처를 지원하고, Connect-Web과 protobuf-ts 메시지의 기본값 스칼라 필드를 그대로 표시하며, 다크 모드 완성도, 페이로드 검색 성능, 연결 복구 안정성, 재전송 상태 및 대용량 스트림 기록의 메모리 관리도 개선했습니다.

## 권장 스토어 필드

- 카테고리: 개발자 도구
- 언어: 한국어
- 홈페이지: https://github.com/jhyang12345/grpc-web-devtools
- 지원: https://github.com/jhyang12345/grpc-web-devtools/issues

