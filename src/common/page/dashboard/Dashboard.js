import React, { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, Dom, useLoader, useFrame } from 'react-three-fiber';
import { TextureLoader, LinearFilter } from 'three';
import lerp from 'lerp';
import { Text, MultilineText } from './components/Text';
import Plane from './components/Plane';
import { Block, useBlock } from './blocks';
import state from './store';
import './styles.css';
import * as types from '../../reducer/commonReducer';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Link } from 'react-router-dom';

function Content() {
    const images = useLoader(
        TextureLoader,
        state.paragraphs.map(({ image }) => image)
    );
    useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images]);
    const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock();
    return (
        <>
            <Block factor={1} offset={0}>
                <Block factor={1.2}>
                    <Text left size={w * 0.0825} position={[-w / 3.2, 0.5, -1]} color="#d40749">
                        (주)서울우유
                    </Text>
                </Block>
                <Block factor={1.0}>
                    <Dom position={[-w / 3.2, -w * 0.08 + 0.25, -1]}>
                        React isn't magic, {mobile ? <br /> : ' '} It's adding innovation to thought
                    </Dom>
                </Block>
            </Block>
        </>
    );
}

function App() {
    const dispatch = useDispatch();
    // const scrollArea = useRef()
    // const onScroll = e => (state.top.current = e.target.scrollTop)
    // useEffect(() => void onScroll({ target: scrollArea.current }), [])

    const startClick = e => {
        e.preventDefault();
        dispatch({ type: types.START_PROJECT });
    };
    return (
        <>
            <Canvas
                className="canvas"
                concurrent
                pixelRatio={1}
                orthographic
                camera={{ zoom: state.zoom, position: [0, 0, 500] }}
            >
                <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
                    <Content />
                    {/* <Diamonds /> */}
                    {/* <Startup /> */}
                </Suspense>
            </Canvas>
            {/* <div className="scrollArea" ref={scrollArea} onScroll={onScroll}> */}
            {/* <div className="scrollArea" >
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div> */}
            <div className="frame">
                <h1 className="frame__title">68th REACT PROJECT</h1>
                <div className="frame__links">
                    <BrowserRouter>
                        <Link
                            className="frame__link"
                            to="/"
                            children="시작하기"
                            onClick={startClick}
                        />
                    </BrowserRouter>
                </div>
                {/*<div className="frame__nav">
           <a className="frame__link" href="#00" children="intro" />
          <a className="frame__link" href="#01" children="01" />
          <a className="frame__link" href="#02" children="02" />
          <a className="frame__link" href="#03" children="03" />
          <a className="frame__link" href="#04" children="04" />
          <a className="frame__link" href="#05" children="05" />
          <a className="frame__link" href="#07" children="06" />
          <a className="frame__link" href="https://celestialsys.com/blog/redux-fundamentals-building-blocks-and-data-flow/" children="redux" /> 
        </div>*/}
            </div>
        </>
    );
}

export default App;
