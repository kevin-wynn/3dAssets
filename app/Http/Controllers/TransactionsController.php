<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Transaction;

class TransactionsController extends Controller
{
    /**
     * Store a new transaction.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $date = $request->$date;
        $payee = $request->$payee;
        $category = $request->$category;
        $notes = $request->$notes;
        $outflow = $request->$outflow;
        $inflow = $request->$inflow;
        $balance = $request->$balance;
        $tags = $request->$tags;
    }
}