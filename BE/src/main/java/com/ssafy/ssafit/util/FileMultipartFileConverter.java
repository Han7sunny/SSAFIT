package com.ssafy.ssafit.util;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;

public class FileMultipartFileConverter {

    public static MultipartFile FiletoMultipartFile(String filePath) throws Exception {

        File file = new File(filePath);
        FileItem fileItem = new DiskFileItem("originFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());

        InputStream input = new FileInputStream(file);
        OutputStream os = fileItem.getOutputStream();
        IOUtils.copy(input, os);

        //jpa.png -> multipart 변환
        MultipartFile mFile = new CommonsMultipartFile(fileItem);
        return mFile;
    }
}
