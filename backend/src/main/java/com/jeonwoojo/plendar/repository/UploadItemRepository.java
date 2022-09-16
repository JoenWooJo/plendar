package com.jeonwoojo.plendar.repository;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jeonwoojo.plendar.vo.UploadItemVo;

@Repository
public class UploadItemRepository {
	
	@Autowired
	private SqlSession sqlSession;
	
	public boolean insertItem(UploadItemVo vo) {
		System.out.println("리포지토리"+vo);
		return sqlSession.insert("uploaditem.insertItem", vo) == 1;
	}
	
	public List<UploadItemVo> bringItem(UploadItemVo vo) {
		System.out.println("리포"+vo);
		return sqlSession.selectList("uploaditem.bringItem", vo);
	} 
	
	public List<UploadItemVo> findItem(Long no) {
		System.out.println("이건 파인드 리포지"+ no);
		return sqlSession.selectList("uploaditem.findItem", no);
	}
	
	public Boolean deleteItem(Long no) {
		System.out.println("deleteItem: 3" + no);

		return sqlSession.delete("uploaditem.deleteItem", no) == 1;
	}
	
	public List<UploadItemVo> downloadItem(String url) {
		System.out.println("이건 다운로드 리포지"+ url);
		return sqlSession.selectList("uploaditem.downloadItem", url);
	}
	
	
}
