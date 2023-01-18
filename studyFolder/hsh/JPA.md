# JPA

## ORM

*Object Relational Mapping을 뜻하며 테이블 구조화 클래스인 VO(DTO) 클래스를 테이블과 매핑*

## Spring Data JPA

~~기존에 JPA를 사용하려면 `EntityManager`를 주입받아 사용하지만,~~

Spring Data JPA는 JPA를 한단계 더 추상화시킨 `Repository` 인터페이스를 제공

→ `Repository` 구현에 JPA 사용

- 사용자가 Repository 인터페이스에 정해진 규칙대로 메소드를 입력하면
- Spring이 알아서 해당 메소드 이름에 적합한 쿼리를 날리는 구현체를 만들어 Bean으로 등록

### Entity 클래스

테이블과 매핑되는 테이블 구조화 클래스

Entity 클래스 $≒$ 테이블

`@Entity`

- 테이블과 매핑되는 클래스
- 기본값으로 클래스의 카멜케이스 이름을 언더스코어 네이밍(_)으로 테이블 이름을 매칭

`@Getter`

- 클래스 내 모든 필드의 `Getter` 메소드 자동 생성
- 객체 일관성을 보장할 수 없는 `Setter` 사용 지양

`@Builder`

- 객체 (생성자) 생성

`@NoArgsConstructor(access = AccessLevel.PROTECTED)`

- 생성자를 protected로 변경하여 생성자 생성 막음

### Repository

*JPA 처리를 담당하는 Repository* 

Repository 인터페이스를 생성한 후 아래의 

*T : Entity의 타입클래스, ID : P.K 값의 Type*

- Repository<T,ID>
- CrudRepository<T,ID>
- PagingAndSortingRepository<T,ID>
- JpaRepository<T,ID>

---

### Hibernate와 Spring Data JPA 차이점

- Hibernate는 JPA 구현체
- Spring Data JPA는 JPA에 대한 데이터 접근의 추상화
    - Hibernate, Eclipse Link 등의 JPA 구현체 사용할 수 있음
    - 항상 위와 같은 JPA 구현체가 필요함
    

[Spring Data JPA 시작 그리고 예제](https://jessyt.tistory.com/9)