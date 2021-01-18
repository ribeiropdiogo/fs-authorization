#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <curl/curl.h>

struct url_data {
    size_t size;
    char *data;
};

size_t write_data(void *ptr, size_t size, size_t nmemb, struct url_data *data) {
    size_t index = data->size;
    size_t n = (size * nmemb);
    char* tmp;

    data->size += (size * nmemb);

    tmp = realloc(data->data, data->size + 1); 

    if(tmp) {
        data->data = tmp;
    } else {
        if(data->data) {
            free(data->data);
        }
        fprintf(stderr, "Failed to allocate memory.\n");
        return 0;
    }

    memcpy((data->data + index), ptr, n);
    data->data[data->size] = '\0';

    return size * nmemb;
}



CURLcode postServer(char *user, char *owner, char *operation, char *target, char **code)
{

    struct url_data data;
    data.size = 0;
    data.data = (char *)malloc(sizeof(char)*4096); //(char *)malloc(sizeof(char)*16);
    if(NULL == data.data)
        return -1;

    data.data[0] = '\0';


	CURL *curl;
	CURLcode res;

	curl = curl_easy_init();
	if(curl) {
		char params[1024];
		sprintf(params, "user=%s&owner=%s&operation=%s&target=%s", user, owner, operation, target);
		
		curl_easy_setopt(curl, CURLOPT_POSTFIELDS, params);
		curl_easy_setopt(curl, CURLOPT_URL, "https://example.com");
		//curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:3000/access/");
	
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &data);
		res = curl_easy_perform(curl);

    	curl_easy_cleanup(curl);

		*code = (char *)malloc(sizeof(char)*data.size+1);
		strcpy(*code, data.data);
		
	}
  	curl_global_cleanup();

	if(NULL == *code)
		return -1;
	
	return res;
}


CURLcode getServer(char *code, char **answer)
{	
	struct url_data data;
    data.size = 0;
    data.data = (char *)malloc(sizeof(char)*16);
    if(NULL == data.data)
        return -1;

    data.data[0] = '\0';

	CURL *curl;
	CURLcode res;
	char url[1024];
	sprintf(url,"http://localhost:3000/access/%s",code); 

	curl = curl_easy_init();
	if(curl) {
		curl_easy_setopt(curl, CURLOPT_TIMEOUT, 30L);
		curl_easy_setopt(curl, CURLOPT_URL, url);
		curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &data);
	
		res = curl_easy_perform(curl);
 
    	curl_easy_cleanup(curl);

		*answer = (char *)malloc(sizeof(char)*data.size+1);
		strcpy(*answer, data.data);
	}
  	curl_global_cleanup();

	if(NULL == code)
		return -1;

	return res;
}




int main(int argc, char *argv[]) {

    char *code; 
    char *answer; 

    CURLcode res = postServer("lpbf","lpbf","lpbf","lpbf", &code);
    //CURLcode res2 = getServer(code, &answer);

    printf("%s\n", code);
    printf("CurlCode: %d\n", res);
    //printf("CurlCode2: %d\n", res2);


}



