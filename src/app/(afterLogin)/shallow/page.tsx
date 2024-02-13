"use client"
import React from 'react';
import {useNumberShallowStore} from "@/store/modal";
import {shallow} from "zustand/shallow";
import {ShallowChildren} from "@/app/(afterLogin)/shallow/_component/ShallowChildren";

export default function Shallow(){
    // atomic state 방식으로 store 사용

    const { numberA, numberB } = useNumberShallowStore((state) => ({
        numberA: state.numberA,
        numberB: state.numberB,
    }),
        shallow
    );
    const increaseNumberA = useNumberShallowStore((state) => state.increaseNumberA);

    return (
        <div>
            <h2>numberA : {numberA}</h2>
            <h2>numberB : {numberB}</h2>
            <button onClick={increaseNumberA}>A 증가</button>
            <ShallowChildren/>
        </div>
    );
};