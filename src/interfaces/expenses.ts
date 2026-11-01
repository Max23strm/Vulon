export interface AllExpensesResponse {
    data:      SimpleExpense[];
    estado?:    string;
    mensaje?:    string;
    isSuccess: boolean;
}



export interface SimpleExpense {
    assigned_to:            string;
    amount:                 number;
    date:                   string;
    reason:                 string;
    expense_type_uid:       string;
    scheduled_expense_uid:  string;
    scheduled_expense_name: string;
    expense_type:           string;
    expense_uid:            string;
}

export interface ExpensesInfo {
    total_spent:                number;
    pending_scheduled_expenses: any[];
    next_scheduled_payment:     NextScheduledPayment;
}

export interface NextScheduledPayment {
    name: string;
    date: Date;
}


export interface ExpenseDetail {
    assigned_to_uid:      string;
    assigned_to:          string;
    reason:               string;
    amount:               string;
    registered_by_uid:    string;
    registered_by:        string;
    date:                 Date;
    expense_type_uid:     string;
    expense_type:         string;
    schedule_name:        string;
    schedule_expense_uid: string;
}


export type ExpenseType = {
    expense_type_uid: string;
    description: string
}
export type ScheduleExpense = {
    expense_type_name: string;
    schedule_expense_uid: string;
    amount: number;
    currency_code: string;
    expense_type_uid: string;
    name: string
}