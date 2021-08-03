export interface TransactionPayloadRequest {
  // Card Info
  card_number: string;
  cvv: number;
  expiry_date: string;
  // Destination User ID
  destination_user_id: number;
  // Value of the Transaction
  value: number;
}

export interface TransactionPayloadResponse {
  success: boolean;
  status: string;
}
