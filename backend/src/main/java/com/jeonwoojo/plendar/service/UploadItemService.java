package com.jeonwoojo.plendar.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jeonwoojo.plendar.repository.UploadItemRepository;
import com.jeonwoojo.plendar.vo.UploadItemVo;

@Service
public class UploadItemService {
	@Autowired
	private UploadItemRepository uploadItemRepository;
	
									//실제 로컬스토리지에 저장될 경로
    private static String SAVE_PATH = ("/plendar-uploads" /*+"/"+ deckVo.projectNo + "/" + cardVo.no + "/"*/);	
	private static String URL_BASE = "/assets";
									//DB에 저장되는 경로

	public String restoreImage(MultipartFile file, UploadItemVo vo) throws FileUploadException {
      try {
         File uploadDirectory = new File(SAVE_PATH+"/"+vo.getProject_no());
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
   public boolean insertItem(UploadItemVo vo) {
	   System.out.println("이건 서비스"+vo);
	   
	   return uploadItemRepository.insertItem(vo);
   }
   
   
	public List<UploadItemVo> bringItem(UploadItemVo vo) {
		System.out.println("서비스"+vo);
		return uploadItemRepository.bringItem(vo);
	}

	
	public List<UploadItemVo> findItem(Long no) {
		System.out.println("이건 파인드 서비스"+ no);
		return uploadItemRepository.findItem(no);
	}
	
	public Boolean deleteItem(Long no) {
		System.out.println("deleteItem: 2" + no);

		return uploadItemRepository.deleteItem(no);
	}
	
	public List<UploadItemVo> downloadItem(String url) {
		System.out.println("이건 다운로드 서비스"+ url);
		return uploadItemRepository.downloadItem(url);
	}
	
}
