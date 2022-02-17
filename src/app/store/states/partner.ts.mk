import { notification } from 'antd';
import { Action, Thunk, thunk, action } from 'easy-peasy';
import { pendingList, partnerSignup, fetchPendingList, fetchpartnerListByLevel, partnerAssign, applicantPartnerDelete } from '../../../http/partner/partner';

export interface Partner {
	pendingList: any,
	signUpStatus: any,
	underPartnerList: any,
	setUnderPartner: Action<Partner, any>;
	setSignUpStatus: Action<Partner, any>;
	setPendingListItem: Action<Partner, any>;
	partnerSignup: Thunk<Partner, any>;
	partnerAssign: Thunk<Partner, any>;
	fetchPendingList: Thunk<Partner>;
	fetchpartnerListByLevel: Thunk<Partner>;
	applicantPartnerDelete: Thunk<Partner, any>;
}

export const partnerStore: Partner = {
	signUpStatus: false,
	pendingList: [],
	underPartnerList: [],
	partnerSignup: thunk(async (actions, payload) => {
		const response = await partnerSignup(payload);
		//console.log(response)
		if (response.status === 201) {
			const body: any = await response.json();
			//console.log(body)
			if (body.messageType == 1) {
				actions.setSignUpStatus(true);
			}
		} else {
			//const body = await response.json();
			actions.setSignUpStatus(null);
		}
	}),
	fetchPendingList: thunk(async (actions, payload) => {
		const response = await fetchPendingList();
		if (response.status === 200) {
			const body: any = await response.json();
			if (body.messageType == 1) {
				actions.setPendingListItem(body.item);
			}
		} else {
			//const body = await response.json();
			actions.setPendingListItem([]);
		}
	}),
	fetchpartnerListByLevel: thunk(async (actions, payload) => {
		const response = await fetchpartnerListByLevel(payload);
		if (response.status === 200) {
			const body: any = await response.json();
			if (body.messageType == 1) {

				let value = body.item?.map(function (item) {
					return {
						value: item?.partnerId,
						label: item?.partnerName
					}
				})
				actions.setUnderPartner(value);
			}
		} else {
			//const body = await response.json();
			actions.setUnderPartner([]);
		}
	}),

	partnerAssign: thunk(async (actions, payload) => {
		const response = await partnerAssign(payload);
		//console.log(response)
		if (response.status === 201 || response.status === 200) {
			const body: any = await response.json();

			notification['success']({
				message: 'Partner Assign',
				description: 'Selected partner has been assigned successfully',
			});
			const newresponse = await fetchPendingList();
			if (newresponse.status === 200) {
				const body: any = await newresponse.json();
				if (body.messageType == 1) {
					actions.setPendingListItem(body.item);
				}
			} else {
				//const body = await response.json();
				actions.setPendingListItem([]);
			}

		} else {
			//const body = await response.json();
			notification['error']({
				message: 'Partner Assign',
				description: 'Something went wrong ',
			});
			//	actions.setSignUpStatus(null);
		}
	}),

	applicantPartnerDelete: thunk(async (actions, payload) => {
		const response = await applicantPartnerDelete(payload);
		//console.log(response)
		if (response.status === 201 || response.status === 200) {
			const body: any = await response.json();

			notification['success']({
				message: 'Partner Assign',
				description: 'Selected partner request has been deleted successfully',
			});
			const newresponse = await fetchPendingList();
			if (newresponse.status === 200) {
				const body: any = await newresponse.json();
				if (body.messageType == 1) {
					actions.setPendingListItem(body.item);
				}
			} else {
				//const body = await response.json();
				actions.setPendingListItem([]);
			}

		} else {
			//const body = await response.json();
			notification['error']({
				message: 'Partner Assign',
				description: 'Something went wrong ',
			});
			//	actions.setSignUpStatus(null);
		}
	}),


	setUnderPartner: action((state, payload) => {
		state.underPartnerList = payload;
	}),
	setSignUpStatus: action((state, payload) => {
		state.signUpStatus = payload;
	}),
	setPendingListItem: action((state, payload) => {
		state.pendingList = payload;
	}),

}
