package academy.loader.model;

public class UploadResponse {
	private String requestId;
	private UploadResponseStatus status;
	public String getRequestId() {
		return requestId;
	}
	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}
	public UploadResponseStatus getStatus() {
		return status;
	}
	public void setStatus(UploadResponseStatus status) {
		this.status = status;
	}
	
	
}
