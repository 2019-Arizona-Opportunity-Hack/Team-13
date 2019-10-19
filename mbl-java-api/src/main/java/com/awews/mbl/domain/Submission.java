package com.awews.mbl.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

@Entity
public class Submission {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
//	may NOT be necessary, change this to something connected to user, ie: userId-formId
//	@OneToOne(fetch = FetchType.EAGER)
//	private Application application;
	
//	actual file name
	private String fileName;
	
	private String contentType;
	
	@Lob
	private byte[] data;
	
	public Submission() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

//	public Application getApplication() {
//		return application;
//	}

//	public void setApplication(Application application) {
//		this.application = application;
//	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

}
