package com.jeonwoojo.plendar.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

//import com.jeonwoojo.plendar.vo.DeckVo;
//import com.jeonwoojo.plendar.vo.CardVo;


@Service
public class FileSharingService {
   private static String SAVE_PATH = ("/plendar-uploads/" +/* deckVo.projectNo + "/" + cardVo.no +*/ "/");
   private static String URL_BASE = "/assets/fileSharing";

   public String restoreImage(MultipartFile file) throws FileUploadException {
      try {
         File uploadDirectory = new File(SAVE_PATH);
         if(!uploadDirectory.exists()) {
            uploadDirectory.mkdir();
         }
         
         if(file.isEmpty()) {
            // throw new FileUploadException("file upload error: image empty");
            return null;
         }
         
         String originFilename = file.getOriginalFilename();
         String extName = originFilename.substring(originFilename.lastIndexOf('.')+1);
         String saveFilename = generateSaveFilename(extName);
         
         byte[] data = file.getBytes();
         OutputStream os = new FileOutputStream(SAVE_PATH + "/" + saveFilename);
         os.write(data);
         os.close();

         return URL_BASE + "/" + saveFilename;
         
      } catch(IOException ex) {
         throw new FileUploadException("file upload error:" + ex);
      }
   }

   private String generateSaveFilename(String extName) {
      String filename = "";
      Calendar calendar = Calendar.getInstance();
      
      filename += calendar.get(Calendar.YEAR);
      filename += calendar.get(Calendar.MONTH);
      filename += calendar.get(Calendar.DATE);
      filename += calendar.get(Calendar.HOUR);
      filename += calendar.get(Calendar.MINUTE);
      filename += calendar.get(Calendar.SECOND);
      filename += calendar.get(Calendar.MILLISECOND);
      filename += ("."+extName);
      
      return filename;
   }
}