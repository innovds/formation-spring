# Configuration in application.properties file :
## H2 :
```
spring.datasource.url=jdbc:h2:mem:mydata
```
## H2 persistent :
``` 
spring.datasource.url=jdbc:h2:file:~/mydata.db
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto = update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
```
## Mysql :
```
spring.datasource.url=jdbc:mysql://localhost:3306/maydata?createDatabaseIfNotExist=true&autoReconnect=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto = update
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5Dialect
```
## Postgres :
```
spring.datasource.url= jdbc:postgresql://localhost:5432/mydata
spring.datasource.username= postgres
spring.datasource.password= mypassword
spring.jpa.properties.hibernate.jdbc.lob.non_contextual_creation= true
spring.jpa.properties.hibernate.dialect= org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto= update
```
## Mongodb :
```
spring.data.mongodb.database=mydata
spring.data.mongodb.port=27017
```
## Cassandra :
```
spring.data.cassandra.keyspace-name=mydata
spring.data.cassandra.contact-points=127.0.0.1
spring.data.cassandra.port=9042
spring.data.cassandra.local-datacenter=datacenter1
spring.data.cassandra.schema-action=CREATE_IF_NOT_EXISTS
spring.data.cassandra.connection.connect-timeout=PT20S
spring.data.cassandra.connection.init-query-timeout=PT20S
spring.data.cassandra.request.timeout=PT20S
spring.data.cassandra.controlconnection.timeout=PT20S
```