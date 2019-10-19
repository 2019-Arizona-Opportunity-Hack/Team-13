package com.awews.mbl.services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.awews.mbl.domain.Response;
import com.awews.mbl.domain.Submission;
import com.awews.mbl.repositories.SubmissionRepository;

@Service
public class SubmissionService {
	
	@Autowired
	private SubmissionRepository submissionRepository;
	
//	public Submission addReponsesToPdf(File pdf, List<Response> responses) throws InvalidPasswordException, IOException {
//		
//		File updatedPdf = pdf;
//		for(int i = 0; i < responses.size(); i++) {
//			
//			addTextToPdf(updatedPdf, responses.get(i));
//		}
//	}
	
	public Submission getFormById(Long userId, String applicationIdentifier, Long submissionId) {
		Submission submission = submissionRepository.getById(submissionId);
		return submission;
	}
	
	public Submission convertPdfToByteThenToSubmission(PDDocument doc) throws IOException {
//		add applicationIdentifier to parameters and use as file name
		
		byte[] docByte = ConvertPdfToByte.loadFile("./updated-i-90a.pdf");
		
		Submission submission = new Submission();
		
		submission.setData(docByte);
		submission.setContentType("application/pdf");
//		fileName should be userId-formName
		submission.setFileName("myI90.pdf");
		
		return submission;
	}
	
	public Submission addTextToPdf(File pdf, List<Response> responses) throws InvalidPasswordException, IOException {
		
		PDDocument doc = PDDocument.load(pdf);
		
		for(int i = 0; i < responses.size(); i++) {
			System.out.println("for loop");

			int pageOnForm = responses.get(i).getPageOnForm(); 
			
			PDPage page = doc.getPage(pageOnForm);
			
			PDPageContentStream contentStream = new PDPageContentStream(doc, page, PDPageContentStream.AppendMode.APPEND, true, true);

			
			
			doc.setAllSecurityToBeRemoved(true);
			
			System.out.println("beginText");
			contentStream.beginText();
			
		try {
			
			System.out.println("try");
			System.out.println("i");
			System.out.println(i);
				int xPlacement = Integer.parseInt(responses.get(i).getxPlacement());
				int yPlacement = Integer.parseInt(responses.get(i).getyPlacement());
				
				contentStream.setFont(PDType1Font.TIMES_ROMAN, 12);
				
				contentStream.newLineAtOffset(xPlacement, yPlacement);

				
				contentStream.showText(responses.get(i).getResponseText());
				System.out.println("showText");
				
				contentStream.endText();
				System.out.println("endText");
				
				System.out.println(responses.get(i).getResponseText()+" was added to the file");
			
				System.out.println("name of filePersisted is "+pdf.getName());
				
				
			
				contentStream.close();
				System.out.println("close");
				doc.save("./updated-i-90a.pdf");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

		doc.close();
	
		
		System.out.println("saveFile");
		
		System.out.println("return doc");
		
		Submission convertedSubmission = convertPdfToByteThenToSubmission(doc);
		
		submissionRepository.save(convertedSubmission);
		
		return convertedSubmission;
	}
	
//	get responses per user applicationIdentifier
	public Submission getPdf(List <Response> responses) throws InvalidPasswordException, IOException {
		
		File pdfForm = new File("./i-90.pdf");
		
		Submission doc = addTextToPdf(pdfForm, responses);
		
		return doc;
	}

}
