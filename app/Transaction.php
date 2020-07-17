<?php

namespace App;

class Transaction
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date', 'payee', 'category', 'notes', 'outflow', 'inflow', 'balance', 'tags'
    ];
}
