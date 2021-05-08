package com.te.accademy.webapi.restcontroller;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.te.accademy.webapi.datamodel.CaseDetail;
import com.te.accademy.webapi.datamodel.CaseDistribution;
import com.te.accademy.webapi.datamodel.CaseSummary;
import com.te.accademy.webapi.datamodel.Country;
import com.te.accademy.webapi.repo.CaseDistributionRepository;

import io.swagger.annotations.ApiOperation;

@RestController
public class CaseDistroController {

	public static class RestResponse {
		public String state;
		public String message;

		RestResponse(String state, String message) {
			this.state = state;
			this.message = message;
		}
	}

	@Autowired
	private CaseDistributionRepository caseDistributionRepository;

	@ApiOperation(value = "List all countries")
	@GetMapping("/countries")
	public List<Country> getAll() {
		return caseDistributionRepository.findDistinctCountries();
	}

	@ApiOperation(value = "Get CaseDistribution entry")
	@GetMapping("/case/{case_id}")
	public ResponseEntity<CaseDetail> getCaseById(@PathVariable Integer case_id) {
		CaseDetail result = caseDistributionRepository.findCaseById(case_id);
		if (result != null) {
			return new ResponseEntity<CaseDetail>(result, HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@ApiOperation(value = "Search CaseDistribution entries")
	@GetMapping("/case")
	public List<CaseDetail> getDetail(//
			@RequestParam(required = false) Date from, //
			@RequestParam(required = false) Date to, //
			@RequestParam(required = false) String country) {

		List<CaseDetail> reesult = caseDistributionRepository.findCaseDetails(from, to, country);

		return reesult;
	}

	@ApiOperation(value = "Insert a new CaseDistribution")
	@PostMapping("/case")
	public RestResponse insertCase(@RequestBody CaseDistribution newCaseDistribution) {

		CaseDistribution caseDistribution = new CaseDistribution();
		BeanUtils.copyProperties(newCaseDistribution, caseDistribution, "id");

		caseDistributionRepository.save(caseDistribution);

		return new RestResponse("Success", "Case created successfully");
	}

	@ApiOperation(value = "Update a CaseDistribution")
	@PutMapping("/case")
	public RestResponse updateCase(@RequestBody CaseDistribution updateCaseDistribution) {
		Optional<CaseDistribution> caseDistribution = caseDistributionRepository
				.findById(updateCaseDistribution.getId());
		if (caseDistribution.isEmpty()) {
			return new RestResponse("Failed", "Cannot find case with id " + updateCaseDistribution.getId());
		}

		BeanUtils.copyProperties(updateCaseDistribution, caseDistribution.get(), "id");

		return new RestResponse("Success", "Case updated successfully");
	}

	@ApiOperation(value = "Delete a CaseDistribution")
	@DeleteMapping("/case")
	public RestResponse deleteCase(@RequestParam Integer caseId) {
		Optional<CaseDistribution> caseDistribution = caseDistributionRepository.findById(caseId);
		if (caseDistribution.isEmpty()) {
			return new RestResponse("Failed", "Cannot find case with id " + caseId);
		}

		caseDistributionRepository.delete(caseDistribution.get());

		return new RestResponse("Success", "Case deleted successfully");
	}

	@ApiOperation(value = "Get CaseDistribution summary")
	@GetMapping("/case-summary")
	public List<CaseSummary> getSummary(//
			@RequestParam(required = false) Date from, //
			@RequestParam(required = false) Date to, //
			@RequestParam(required = false) String country) {
		return caseDistributionRepository.findCaseSummaries(from, to, country);
	}
}
