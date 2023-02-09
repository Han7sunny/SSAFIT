package com.ssafy.ssafit.app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;


import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.UiConfiguration;
//import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.servlet.ServletContext;


//@OpenAPIDefinition(
//        info = @Info(title = "채팅서비스 API 명세서",
//                description = "헥사고날 아키텍처 기반 채팅 서비스 API 명세서",
//                version = "v1"))
//@RequiredArgsConstructor
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.ssafy.ssafit"))
//                .paths(PathSelectors.any())
                .paths(PathSelectors.ant("/api/**"))
                .build();
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("SSAFIT API v1")
                .version("1.0")
                .description("SSAFIT API입니다.")
//                .license("라이센스 작성")
//                .licenseUrl("라이센스 URL 작성")
                .build();
    }




//    @Bean
//    public GroupedOpenApi jwtApi() {
//        return GroupedOpenApi.builder()
//                .group("SSAFIT v1 Definition")
//                .pathsToMatch("/**")
//                .build();
//    }
//
//    @Bean
//    public OpenAPI customOpenAPI() {
//        return new OpenAPI()
//                .components(new Components())
//                .info(new Info().title("SSAFIT API")
//                        .description("SSAFIT API 프로젝트입니다.")
//                        .version("v0.0.1"));
//    }

//	Swagger-UI 2.x 확인
//	http://localhost[:8080]/{your-app-root}/swagger-ui.html
//	Swagger-UI 3.x 확인
//	http://localhost[:8080]/{your-app-root}/swagger-ui/index.html

//    private String version = "v1";
//    private String title = "SSAFIT API " + version;
//
//    @Bean
//    public Docket SwaggerApi(ServletContext servletContext) {
//
//        return new Docket(DocumentationType.SWAGGER_2)
////                .consumes(getConsumeContentTypes())
////                .produces(getProduceContentTypes())
//                .apiInfo(apiInfo())
//                .groupName("Anding")
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.ssafy.ssafit"))
//                .paths(PathSelectors.ant("/app/**"))
//                .build()
//                .useDefaultResponseMessages(false);
//
//
//
//        private ApiInfo apiInfo() {
//        String descript = "SSAFIT API Reference for Developers<br>";
////        descript += "<img src=\"http://localhost:9999/assets/images/icon/logo_color.png\">"; // 로고
//        return new ApiInfoBuilder().title(title).description(descript)
////				.termsOfServiceUrl("https://edu.ssafy.com")
////				.contact(new Contact("SSAFY", "https://edu.ssafy.com", "ssafy@ssafy.com"))
//                .license("SSAFIT License")
//                .licenseUrl("SSAFIT@ssafit.com").version("1.0").build();
//    }
//
//    // API마다 구분짓기 위한 설정.
//    @Bean
//    public Docket userApi() {
//        return getDocket("User", Predicates.or(PathSelectors.regex("/user.*")));
//    }
//
//    @Bean
//    public Docket boardApi() {
//        return getDocket("Board", Predicates.or(PathSelectors.regex("/board.*")));
//    }
//
////    @Bean
////    public Docket contentApi() {
////        return getDocket("Content", Predicates.or(PathSelectors.regex("/content.*")));
////    }
////
////    @Bean
////    public Docket hanokApi() {
////        return getDocket("Hanok", Predicates.or(PathSelectors.regex("/hanok.*")));
////    }
////
////    @Bean
////    public Docket stateApi() {
////        return getDocket("State", Predicates.or(PathSelectors.regex("/state.*")));
////    }
////
////    @Bean
////    public Docket themeApi() {
////        return getDocket("Theme", Predicates.or(PathSelectors.regex("/theme.*")));
////    }
//
//    @Bean
//    public Docket allApi() {
//        return getDocket("All", Predicates.or(PathSelectors.regex("/*.*")));
//    }
//
//    public Docket getDocket(String groupName, Predicate<String> predicate) {
////		List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
////		responseMessages.add(new ResponseMessageBuilder().code(200).message("OK !!!").build());
////		responseMessages.add(new ResponseMessageBuilder().code(500).message("서버 문제 발생 !!!").responseModel(new ModelRef("Error")).build());
////		responseMessages.add(new ResponseMessageBuilder().code(404).message("페이지를 찾을 수 없습니다 !!!").build());
//        return new Docket(DocumentationType.SWAGGER_2).groupName(groupName).apiInfo(apiInfo()).select()
//                .apis(RequestHandlerSelectors.basePackage("com.snc.enjoytrip")).paths(predicate)
//                .apis(RequestHandlerSelectors.any()).build();
////				.useDefaultResponseMessages(false)
////				.globalResponseMessage(RequestMethod.GET,responseMessages);
//    }
//
//    // swagger ui 설정.
//    @Bean
//    public UiConfiguration uiConfig() {
//        return UiConfigurationBuilder.builder()
//                .displayRequestDuration(true).validatorUrl("")
//                .build();
//    }


}
